# first-electron-app


var child = spawn('spark-submit', ["--class","org.glsc.FullLog","--master","local[4]", 
"D:\\IdeaProjects\\LogAnalysis\\target\\LogAnalysis-1.0-SNAPSHOT.jar", "D:\\zzp", "28018167"]);