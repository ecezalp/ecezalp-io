import noArgsConstructor from "./noArgsConstructor";

const jsonInSql = {};

jsonInSql.text = "What is the best way to store data? This is a question that has been driving innovation for milennia. From clay tablets to distributed ledgers, there seems to be countless ways to store data. The *best* way of storage depends on why and how the data will later be utilized. SQL and NoSQL are popular alternatives in modern web development. It is said that SQL is being embraced by the web development community once again, after the maturing of applications that have been using NoSQL solutions. Everything comes with its perks and disadvantages. Today I want to talk about a hybrid approach to data storage. In this hybrid approach, we store Json in SQL databases, creating non-relational patterns within a relational database.\n" +
  "\n" +
  "You might be asking, why? Why go through with storing Json, when you already have tables? Would it not be easier just to create a new table or view, and query just that? The answer might be yes.. It is hard to argue what is the best for a particular developer, application, or scenario without knowing the specifics. In order to explain why we would do this, let me talk about some real life examples when this approach has worked for me.\n" +
  "\n" +
  "I have been working on a personal project which allows the users to create a virtual garden. The flowers table looks like this:\n" +
  "\n" +
  "```sql\n" +
  "// V001__create_flowers_table.sql\n" +
  "\n" +
  "CREATE SEQUENCE flower_id_seq START WITH 1 INCREMENT BY 1;\n" +
  " \n" +
  "CREATE TABLE flowers (\n" +
  "\tid \t\t\t\tINTEGER DEFAULT flower_id_seq.nextval NOT NULL,\n" +
  "\tgarden_id\t\tINTEGER\t\t\t\tNOT NULL,\n" +
  "\tshape \t\t\tVARCHAR(255) \t\tNOT NULL,\n" +
  "\tpetal_count \tINTEGER \t\t\tNOT NULL,\n" +
  "\tpetal_shape \tVARCHAR(255) \t\tNOT NULL,\n" +
  "\tpetal_color \tVARCHAR(255) \t\tNOT NULL,\n" +
  "\tstem_color\t\tVARCHAR(255) \t\tNOT NULL,\n" +
  "\n" +
  "\tCONSTRAINT pk_flowers PRIMARY KEY (id)\n" +
  ");\n" +
  "```\n" +
  "\n" +
  "The flower object looks like this: \n" +
  "\n" +
  "```java\n" +
  "// flower.java\n" +
  "\n" +
  "@Data\n" +
  "@Builder\n" +
  "@AllArgsContructor\n" +
  "@NoArgsConstructor\n" +
  "public class Flower {\n" +
  "\tprivate Integer id;\n" +
  "\tprivate Integer gardenId;\n" +
  "\tprivate Integer petalCount;\n" +
  "\tprivate String shape;\n" +
  "\tprivate String petalShape;\n" +
  "\tprivate String petalColor;\n" +
  "\tprivate String stemColor;\n" +
  "}\n" +
  "```\n" +
  "\n" +
  "The create method in the flowers repository looks like this: \n" +
  "\n" +
  "```java\n" +
  "// flowersRepository.java\n" +
  "\n" +
  "public Flower create(Flower flower) {\n" +
  "\n" +
  "\tKeyholder holder = new GeneratedKeyHolder();\n" +
  "\n" +
  "\tString sql = \"INSERT INTO FLOWERS \\n\" + \n" +
  "\t\"(ID, GARDEN_ID, SHAPE, PETAL_COUNT, PETAL_SHAPE, PETAL_COLOR, STEM_COLOR) \\n\" +\n" +
  "\t\"VALUES (DEFAULT, :gardenId, :shape, :petalCount, :petalShape, :petalColor, :stemColor)\";\n" +
  "\n" +
  "\ttemplate.update(sql, new MapSqlParameterSource()\n" +
  "\t\t.addValue(\"gardenId\", flower.getGardenId())\n" +
  "\t\t.addValue(\"shape\", flower.getShape())\n" +
  "\t\t.addValue(\"petalCount\", flower.getPetalCount())\n" +
  "\t\t.addValue(\"petalShape\", flower.getPetalShape())\n" +
  "\t\t.addValue(\"petalColor\", flower.getPetalColor())\n" +
  "\t\t.addValue(\"stemColor\", flower.getStemColor(), holder, new String[]{\"id\"})\n" +
  "\t)\n" +
  "\n" +
  "\tflower.setId(holder.getKey().intValue());\n" +
  "\t\n" +
  "\treturn flower;\n" +
  "}\n" +
  "\n" +
  "```\n" +
  "\n" +
  "The flower builder looked like this:\n" +
  "\n" +
  "```java\n" +
  "public static Flower buildFlower(ResultSet rs, int i) throws SQLException {\n" +
  "\treturn Flower.builder()\n" +
  "\t\t.id(rs.getInt(\"id\"))\n" +
  "\t\t.gardenId(rs.getInt(\"garden_id\"))\n" +
  "\t\t.shape(rs.getString(\"shape\"))\n" +
  "\t\t.petalCount(rs.getInt(\"petal_count\"))\n" +
  "\t\t.petalShape(rs.getString(\"petal_shape\"))\n" +
  "\t\t.petalColor(rs.getString(\"petal_color\"))\n" +
  "\t\t.stemColor(rs.getString(\"stem_color\"))\n" +
  "\t.build();\n" +
  "}\n" +
  "\n" +
  "```\n" +
  "\n" +
  "One day, I realized that I will be able to understand my users better if I ended up tracking the changes within the flowers that they have been creating and updating. In order to do this, I would have to persist a snapshot of a flower each time they took an update action. \n" +
  "\n" +
  "While this data I was about to persist was important to me, it was not so important to my users at this stage. Their in-app experience would not be immediately changing; in fact, for them, everything would remain the same. The best way to ensure this was to not touch the above methods at all. I wanted to process the flower right after the update. \n" +
  "\n" +
  "I created a versions table for the flower for this purpose, which looked like this:\n" +
  "\n" +
  "```sql\n" +
  "// V002__create_flower_versions_table.sql\n" +
  "\n" +
  "CREATE SEQUENCE flower_versions_id_seq START WITH 1 INCREMENT BY 1;\n" +
  " \n" +
  "CREATE TABLE flower_versions (\n" +
  "\tid \t\t\t\t\tINTEGER DEFAULT flower_versions_id_seq.nextval NOT NULL,\n" +
  "\tflower_id\t\t\tINTEGER\t\t\tNOT NULL,\n" +
  "\tversion \t\t\tINTEGER\t \t\tNOT NULL,\n" +
  "\tflower_json\t\t\tCLOB\t\t\tDEFAULT NULL,\n" +
  "\t\n" +
  "\tCONSTRAINT pk_flower_versions PRIMARY KEY (id),\n" +
  "\tCONSTRAINT unique_version_per_flower UNIQUE (flower_id, version)\n" +
  ");\n" +
  "```\n" +
  "\n" +
  "As we can see above, there are three important fields in this table. The *version*, which is incremented on the server side each time a specific flower is saved. The *flower_id*, which is the id of the flower being updated, and *flower_json*, which is the flower object in json format. Flowers can be instantiated using this json above, since json will contain all information that the flower would normally contain, such as the garden id or the stem color. \n" +
  "\n" +
  "Also, please note the *unique* constraint here. This constraint makes sure that specific flower can only have one version that corresponds to a version number - that is the point of versioning, isn't it? Every time a version is created, it is supposed to have a unique id. \n" +
  "\n" +
  "All we need to do now is to create a flowerVersionRepository, which has methods such as a *getCurrentVersionNumber* to get the version number, and an *create* method that inserts version entries into the table. So lets take a quick look at those!\n" +
  "\n" +
  "To get the version number:\n" +
  "\n" +
  "```java\n" +
  "// flowerVersionsRepository.java\n" +
  "\n" +
  "private Integer getNewFlowerVersion(Integer flowerId) {\n" +
  "\n" +
  "\tString sql = \"SELECT MAX(version) AS max_version \\n\" +\n" +
  "\t\"FROM flower_versions \\n\" +\n" +
  "\t\"WHERE flower_id = :flowerId\";\n" +
  "\n" +
  "\tInteger currentVersion = template.query(sql, new MapSqlParameterSource()\n" +
  "\t\t.addValue(\"flowerId\", flowerId),\n" +
  "\t\tthis::extractVersion\n" +
  "\t);\n" +
  "\t\n" +
  "\treturn ++currentVersion;\n" +
  "}\n" +
  "\n" +
  "private Integer extractVersion(ResultSet rs) throws SQLException {\n" +
  "\t\n" +
  "\tInteger version = 0;\n" +
  "\t\n" +
  "\twhile(rs.next()) {\n" +
  "\t\tversion = rs.getInt(\"max_version\");\n" +
  "\t}\n" +
  "\t\n" +
  "\treturn version;\n" +
  "}\n" +
  "```\n" +
  "\n" +
  "and finally, to create the flower version: \n" +
  "\n" +
  "```java\n" +
  "// flowerVersionsRepository.java\n" +
  "\n" +
  "public Integer create(Flower flower) {\n" +
  "\t\n" +
  "\tKeyholder holder = new GeneratedKeyHolder();\n" +
  "\t\n" +
  "\tString sql = \"INSERT INTO flower_versions \\n\" +\n" +
  "\t\"(id, flower_id, version, flower_json) \\n\" +\n" +
  "\t\"VALUES (DEFAULT, :flowerId, :version, :flowerJson)\";\n" +
  "\t\n" +
  "\ttemplate.update(sql, new MapSqlParameterSource()\n" +
  "\t\t.addValue(\"flowerId\", flower.getId())\n" +
  "\t\t.addValue(\"version\", this::getNewFlowerVersion(flower.getId()))\n" +
  "\t\t.addValue(\"flowerJson\", toJson(flower)),\n" +
  "\t\tholder,\n" +
  "\t\tnew String[]{\"flower_version_id}\n" +
  "\t) \n" +
  "\n" +
  "\treturn holder.getKey().intValue();\n" +
  "}\n" +
  "```\n" +
  "\n" +
  "This is it! Now that the methods are in place, the only thing I would need to do is to call them. As things are, my controllers are very clean, and therefore I don't see a problem in calling these two methods (regular create and version create) in the controller back to back, since there is not much else. However, I can also see how a service class that encompasses both of these methods can be introduced if things start getting more complicated.\n" +
  "\n" +
  "Another thing I want to draw attention here is the *toJson* method. I did not define that method on purpose, because I believe that it might deserve its own post. *toJson* and *fromJson* methods in this contexts are just POJO to Json converters. You can write them on your own or use a library if you would like. If you want to learn how I did those, stay tuned! \n" +
  "\n" +
  "Before I finish, I want to reiterate why this has been a valuable solution for me. As you can see, I didn't have to modify my flowers table or repository at all. I was able to just add a new table and a new method to do some fast tracking. Also, it is easy for me to just grab the json from the table and do whatever I want to do with it, whether that can be instantiating flower objects from it using a Json to POJO converter, or anything else. If I want to, I can easily serve them from an endpoint - I can really do whatever I want with this extra data, without having to mess with my tables that I am using in production that are designed to serve my users. I don't plan to use this json for sorting or searching, I still have my current flowers table that I can query with SQL. Overall, this is a win-win solution for me!\n" +
  "\n" +
  "I believe in the strenght of raw SQL, and think that intricately designed table relations is a very important part of any complex application. I also understand that a wrapper like GraphQL is very useful for querying that data. However, I do think that there can be moments when a hybrid solution can work, such as the example above. I think that it is good for any developer to work out their approach on their own by working on personal projects, and if possible, in professional teams that are open minded about versatile solutions. \n" +
  "\n";

jsonInSql.title = "Hybrid Data Modeling: Json in SQL";

jsonInSql.shortText = "What is the best way to store data? This is a question that has been driving innovation for milennia. From clay tablets to distributed ledgers, there seems to be countless ways to store data. The *best* way of storage depends on why and how the data will later be utilized. SQL and NoSQL are popular alternatives in modern web development. It is said that SQL is being embraced by the web development community once again, after the maturing of applications that have been using NoSQL solutions. Everything comes with its perks and disadvantages. Today I want to talk about a hybrid approach to data storage. In this hybrid approach, we store Json in SQL databases, creating non-relational patterns within a relational database.\n";

jsonInSql.tags = ["Java", "SQL", "Persistence"];

export default jsonInSql;