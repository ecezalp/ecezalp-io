# Hybrid Data Modeling: Json in SQL

What is the best way to store data? This is a question that has been driving innovation for milennia. From clay tablets to distributed ledgers, there seems to be countless ways to store data. The *best* way of storage depends on why and how the data will later be utilized. SQL and NoSQL are popular alternatives in modern web development. It is said that SQL is being embraced by the web development community once again, after the maturing of applications that have been using NoSQL solutions. Everything comes with its perks and disadvantages. Today I want to talk about a hybrid approach to data storage. In this hybrid approach, we store Json in SQL databases, creating non-relational patterns within a relational database.

You might be asking, why? Why go through with storing Json, when you already have tables? Would it not be easier just to create a new table or view, and query just that? The answer might be yes.. It is hard to argue what is the best for a particular developer, application, or scenario without knowing the specifics. In order to explain why we would do this, let me talk about some real life examples when this approach has worked for me.

I have been working on a personal project which allows the users to create a virtual garden. The flowers table looks like this:

```sql
// V001__create_flowers_table.sql

CREATE SEQUENCE flower_id_seq START WITH 1 INCREMENT BY 1;
 
CREATE TABLE flowers (
	id 				INTEGER DEFAULT flower_id_seq.nextval NOT NULL,
	garden_id		INTEGER				NOT NULL,
	shape 			VARCHAR(255) 		NOT NULL,
	petal_count 	INTEGER 			NOT NULL,
	petal_shape 	VARCHAR(255) 		NOT NULL,
	petal_color 	VARCHAR(255) 		NOT NULL,
	stem_color		VARCHAR(255) 		NOT NULL,

	CONSTRAINT pk_flowers PRIMARY KEY (id)
);
```

The flower object looks like this: 

```java
// flower.java

@Data
@Builder
@AllArgsContructor
@NoArgsConstructor
public class Flower {
	private Integer id;
	private Integer gardenId;
	private Integer petalCount;
	private String shape;
	private String petalShape;
	private String petalColor;
	private String stemColor;
}
```

The create method in the flowers repository looks like this: 

```java
// flowersRepository.java

public Flower create(Flower flower) {

	Keyholder holder = new GeneratedKeyHolder();

	String sql = "INSERT INTO FLOWERS \n" + 
	"(ID, GARDEN_ID, SHAPE, PETAL_COUNT, PETAL_SHAPE, PETAL_COLOR, STEM_COLOR) \n" +
	"VALUES (DEFAULT, :gardenId, :shape, :petalCount, :petalShape, :petalColor, :stemColor)";

	template.update(sql, new MapSqlParameterSource()
		.addValue("gardenId", flower.getGardenId())
		.addValue("shape", flower.getShape())
		.addValue("petalCount", flower.getPetalCount())
		.addValue("petalShape", flower.getPetalShape())
		.addValue("petalColor", flower.getPetalColor())
		.addValue("stemColor", flower.getStemColor(), holder, new String[]{"id"})
	)

	flower.setId(holder.getKey().intValue());
	
	return flower;
}

```

The flower builder looked like this:

```java
public static Flower buildFlower(ResultSet rs, int i) throws SQLException {
	return Flower.builder()
		.id(rs.getInt("id"))
		.gardenId(rs.getInt("garden_id"))
		.shape(rs.getString("shape"))
		.petalCount(rs.getInt("petal_count"))
		.petalShape(rs.getString("petal_shape"))
		.petalColor(rs.getString("petal_color"))
		.stemColor(rs.getString("stem_color"))
	.build();
}

```

One day, I realized that I will be able to understand my users better if I ended up tracking the changes within the flowers that they have been creating and updating. In order to do this, I would have to persist a snapshot of a flower each time they took an update action. 

While this data I was about to persist was important to me, it was not so important to my users at this stage. Their in-app experience would not be immediately changing; in fact, for them, everything would remain the same. The best way to ensure this was to not touch the above methods at all. I wanted to process the flower right after the update. 

I created a versions table for the flower for this purpose, which looked like this:

```sql
// V002__create_flower_versions_table.sql

CREATE SEQUENCE flower_versions_id_seq START WITH 1 INCREMENT BY 1;
 
CREATE TABLE flower_versions (
	id 					INTEGER DEFAULT flower_versions_id_seq.nextval NOT NULL,
	flower_id			INTEGER			NOT NULL,
	version 			INTEGER	 		NOT NULL,
	flower_json			CLOB			DEFAULT NULL,
	
	CONSTRAINT pk_flower_versions PRIMARY KEY (id),
	CONSTRAINT unique_version_per_flower UNIQUE (flower_id, version)
);
```

As we can see above, there are three important fields in this table. The *version*, which is incremented on the server side each time a specific flower is saved. The *flower_id*, which is the id of the flower being updated, and *flower_json*, which is the flower object in json format. Flowers can be instantiated using this json above, since json will contain all information that the flower would normally contain, such as the garden id or the stem color. 

Also, please note the *unique* constraint here. This constraint makes sure that specific flower can only have one version that corresponds to a version number - that is the point of versioning, isn't it? Every time a version is created, it is supposed to have a unique id. 

All we need to do now is to create a flowerVersionRepository, which has methods such as a *getCurrentVersionNumber* to get the version number, and an *create* method that inserts version entries into the table. So lets take a quick look at those!

To get the version number:

```java
// flowerVersionsRepository.java

private Integer getNewFlowerVersion(Integer flowerId) {

	String sql = "SELECT MAX(version) AS max_version \n" +
	"FROM flower_versions \n" +
	"WHERE flower_id = :flowerId";

	Integer currentVersion = template.query(sql, new MapSqlParameterSource()
		.addValue("flowerId", flowerId),
		this::extractVersion
	);
	
	return ++currentVersion;
}

private Integer extractVersion(ResultSet rs) throws SQLException {
	
	Integer version = 0;
	
	while(rs.next()) {
		version = rs.getInt("max_version");
	}
	
	return version;
}
```

and finally, to create the flower version: 

```java
// flowerVersionsRepository.java

public Integer create(Flower flower) {
	
	Keyholder holder = new GeneratedKeyHolder();
	
	String sql = "INSERT INTO flower_versions \n" +
	"(id, flower_id, version, flower_json) \n" +
	"VALUES (DEFAULT, :flowerId, :version, :flowerJson)";
	
	template.update(sql, new MapSqlParameterSource()
		.addValue("flowerId", flower.getId())
		.addValue("version", this::getNewFlowerVersion(flower.getId()))
		.addValue("flowerJson", toJson(flower)),
		holder,
		new String[]{"flower_version_id}
	) 

	return holder.getKey().intValue();
}
```

This is it! Now that the methods are in place, the only thing I would need to do is to call them. As things are, my controllers are very clean, and therefore I don't see a problem in calling these two methods (regular create and version create) in the controller back to back, since there is not much else. However, I can also see how a service class that encompasses both of these methods can be introduced if things start getting more complicated.

Another thing I want to draw attention here is the *toJson* method. I did not define that method on purpose, because I believe that it might deserve its own post. *toJson* and *fromJson* methods in this contexts are just POJO to Json converters. You can write them on your own or use a library if you would like. If you want to learn how I did those, stay tuned! 

Before I finish, I want to reiterate why this has been a valuable solution for me. As you can see, I didn't have to modify my flowers table or repository at all. I was able to just add a new table and a new method to do some fast tracking. Also, it is easy for me to just grab the json from the table and do whatever I want to do with it, whether that can be instantiating flower objects from it using a Json to POJO converter, or anything else. If I want to, I can easily serve them from an endpoint - I can really do whatever I want with this extra data, without having to mess with my tables that I am using in production that are designed to serve my users. I don't plan to use this json for sorting or searching, I still have my current flowers table that I can query with SQL. Overall, this is a win-win solution for me!

I believe in the strenght of raw SQL, and think that intricately designed table relations is a very important part of any complex application. I also understand that a wrapper like GraphQL is very useful for querying that data. However, I do think that there can be moments when a hybrid solution can work, such as the example above. I think that it is good for any developer to work out their approach on their own by working on personal projects, and if possible, in professional teams that are open minded about versatile solutions. 

