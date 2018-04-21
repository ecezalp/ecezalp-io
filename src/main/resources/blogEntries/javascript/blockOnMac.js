const blockOnMac = Object.assign({});

blockOnMac.text = "I spend many, many hours on the computer every day. I work full time as a software engineer, and I code pet projects on weekends. Recently I have started this blog, which also means more time spent on the computer. \n" +
  "\n" +
  "I wanted to decrease my screen time, but not give up on my passion of web development. With my partner's advice, I decided to let go of some social media sites on my personal computer. Here is how:\n" +
  "\n" +
  "**1. Open your terminal and execute** ***sudo nano /etc/hosts***\n" +
  "\n" +
  "`sudo` is the command that prompts you to log in as an admin on your computer. \n" +
  "\n" +
  "`nano` is the text editor we will be using. If you would like to do so, you could use vim by typing `sudo vi /etc/hosts` instead. If that is the case, the file editing instructions will be slightly different. You can go into insert mode by pressing ```i```, and you can save and exit by pressing ```Esc``` and typing ```:wq```.\n" +
  "\n" +
  "```/etc/hosts``` is a file that overrides your DNS configuration. DNS resolvers are remote, and their purpose is to match up IP addresses with human-readable website names. The hosts file is local, preferred over the information received from a DNS server. The [wikipedia page](https://en.wikipedia.org/wiki/Hosts_(file)) has the best details on this.\n" +
  "\n" +
  "**2. Update the file with sites you want to block**\n" +
  "\n" +
  "At first, you will most probably see something like this:\n" +
  "\n" +
  "```\n" +
  "##\n" +
  "# Host Database\n" +
  "#\n" +
  "# localhost is used to configure the loopback interface\n" +
  "# when the system is booting.  Do not change this entry.\n" +
  "##\n" +
  "127.0.0.1       localhost\n" +
  "255.255.255.255 broadcasthost\n" +
  "::1             localhost\n" +
  "```\n" +
  "\n" +
  "```127.0.0.1``` is your *home*, and the name ```localhost``` is tied to it. Therefore, whenever you listen to any port on your localhost (such as ```localhost:8080``` or ```localhost:3000```) you end up connecting to yourself / your home, which is ```127.0.0.1```. We are going to utilize this feature: wouldn't it be great to connect *home* instead of *the internet* with a facebook request, for example?\n" +
  "\n" +
  "Edit the file to look more like this (comments are optional): \n" +
  "\n" +
  "```zsh\n" +
  "##\n" +
  "# Host Database\n" +
  "#\n" +
  "# localhost is used to configure the loopback interface\n" +
  "# when the system is booting.  Do not change this entry.\n" +
  "##\n" +
  "127.0.0.1       localhost\n" +
  "# block facebook\n" +
  "127.0.0.1       www.facebook.com\n" +
  "127.0.0.1       facebook.com\n" +
  "# block reddit\n" +
  "127.0.0.1       www.reddit.com\n" +
  "127.0.0.1       reddit.com\n" +
  "# block eksisozluk\n" +
  "127.0.0.1       www.eksisozluk.com\n" +
  "127.0.0.1       eksisozluk.com\n" +
  "#\n" +
  "255.255.255.255 broadcasthost\n" +
  "::1             localhost\n" +
  "```\n" +
  "\n" +
  "after you are done editing the file, press ```Control + o``` to write, and ```Control + x``` to exit. \n" +
  "\n" +
  "**3. Execute** ```sudo dscacheutil -flushcache``` **and clear your browser cache**\n" +
  "\n" +
  "Now that you updated the hosts file, you will now be redirected to your localhost whenever you make a request to those links. However, there might have been some cache leftover that makes it look like the operation was unsuccessful. In order to avoid that scenario, you might want to flush your DNS cache by running the script above, as well as open your browser and clear the browser cache (in Chrome, open the developer tools by pressing ```Command + Option + J```, right click the page refresh arrow, and select ```Empty Cache and Hard Reload```.";

blockOnMac.title = "block social media sites on your Mac";

blockOnMac.shortText =  "I spend many, many hours on the computer every day. I work full time as a software engineer, and I code pet projects on weekends. Recently I have started this blog, which also means more time spent on the computer. \n" +
  "\n" +
  "I wanted to decrease my screen time, but not give up on my passion of web development. With my partner's advice, I decided to let go of some social media sites on my personal computer. Here is how:\n";

blockOnMac.tags = ["bash", "environment setup"];

export default blockOnMac;