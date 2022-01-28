import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.sql.ResultSet;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.Properties;
import java.util.Scanner;

public class project {
  /** The name of the MySQL account to use (or empty for anonymous) */
  private final String userName = "root";

  /** The password for the MySQL account (or empty for anonymous) */
  private final String password = "password";

  /** The name of the computer running MySQL */
  private final String serverName = "localhost";

  /** The port of the MySQL server (default is 3306) */
  private final int portNumber = 3306;

  /** The name of the database we are testing with (this default is installed with MySQL) */
  private final String dbName = "text_share_project";
  
  /** The name of the table we are testing with */
  private final String tableName = "user";
  
  //get connection
  public Connection getConnection() throws SQLException {
    Connection conn = null;
    Properties connectionProps = new Properties();
    
    Scanner myUserName = new Scanner(System.in);
    System.out.print("Enter Username: ");
    String userName1 = myUserName.nextLine();
    System.out.print("Enter Username is:" + userName1 +"\r");
    
    connectionProps.put("user", userName1);
      
    Scanner myPassword = new Scanner(System.in);
    System.out.print("Enter Password: ");
    String password1 = myPassword.nextLine();
    System.out.println("Enter Password is: " + password1);
    
    connectionProps.put("password", password1);       
     
    conn = DriverManager.getConnection("jdbc:mysql://"
        + this.serverName + ":" + this.portNumber + "/" + this.dbName + 
        "?allowPublicKeyRetrieval=true&"
        + "characterEncoding=UTF-8&useSSL=false",
        connectionProps);
    return conn;
  }

  public boolean executeUpdate(Connection conn, String command) throws SQLException {
      Statement stmt = null;
      try {
          stmt = conn.createStatement();
          stmt.executeUpdate(command); // This will throw a SQLException if it fails
          return true;
      } finally {

        // This will run whether we throw an exception or not
          if (stmt != null) { stmt.close(); }
      }
  }
  
  /**
   * Connect to MySQL and do some stuff.
   */
  public void run() {
   
    // Connect to MySQL
    Connection conn = null;
    try {
      conn = this.getConnection();
      System.out.println("Connected to database \r");
    } catch (SQLException e) {
      System.out.println("ERROR: Could not connect to the database");
      e.printStackTrace();
      return;
    }
    
    try {
      Scanner beginQues = new Scanner(System.in);
      System.out.print("Are you an existed user for the application? \r"
          + "If so, please type yes. If not, please enter no and we will "
          + "help you to register as an user. \r"
          + "If you are administrator, please enter administrator \r"
          + "Please enter your answer (yes, no, or administrator): ");
      String Answer1 = beginQues.nextLine();
    
      if (Answer1.equals("yes")) {
        //enter user_id
        Scanner userQ1 = new Scanner(System.in);
        System.out.print("Please enter your user_id: ");
        String userA1 = userQ1.nextLine();
      
        //ask for password
        Scanner userQ2 = new Scanner(System.in);
        System.out.print("Please enter your password: \r");
        String userA2 = userQ2.nextLine();
      
        //check password
        String callPass = "call find_user_password(" + userA1 + ")";
      
        Statement stmt0 = conn.createStatement();
        ResultSet rs0 = stmt0.executeQuery(callPass);
        String password = "";
      
        while (rs0.next()) {
          password = rs0.getString("user_password");
        }
        
        if (password.equals(userA2)) {
          Scanner userQ3 = new Scanner(System.in);
          System.out.print("We confrim that you are our user ! Welcome back! \r"
              + "What do you want to do? \r" + "1. upload text \r"
              + "2. Search text by name \r"
              + "3. Find your reading history \r"
              + "Please enter your answer (1 or 2  or 3):  \r");
          String userA3 = userQ3.nextLine();
          
          if (userA3.equals("1")) {
            System.out.print("Thanks for sharing your text resource! We will help"
                + "you to upload text! \r");
            
            Scanner textName = new Scanner(System.in);
            System.out.print("Please enter the name of text (with '' mark): ");
            String textName1 = textName.nextLine();
            
            Scanner textDes = new Scanner(System.in);
            System.out.print("Please enter the description of text (with '' mark): ");
            String textDes1 = textDes.nextLine();
            
            Scanner textCon = new Scanner(System.in);
            System.out.print("Please enter the content of text (with '' mark): ");
            String textCon1 = textCon.nextLine();
            
            /*
            String data = "";
            File f1 = new File("C:\\Users\\zhaot\\Desktop\\text.txt");
            //"C:\\Users\\zhaot\\Desktop\\text.txt"
            Scanner Reader = new Scanner(f1);
            while (Reader.hasNextLine()) {
              data = Reader.nextLine();
              System.out.println(data);
            }
            */
            
            //present the existed genre
            System.out.println("\r The genre list");
            String genreList = "SELECT genre_name FROM genre;";

            Statement stmt1 = conn.createStatement();
            ResultSet rs1 = stmt1.executeQuery(genreList);
            ArrayList<String> genreNameList = new ArrayList<String>();
            
            while (rs1.next()) {
              genreNameList.add(rs1.getString("genre_name"));
            }
            System.out.println(genreNameList);
            
            //ask an input of genre
            Scanner textGenre = new Scanner(System.in);
            System.out.print("\rPlease choose an approraite genre in the list (with '' mark): ");
            String textGenre1 = textGenre.nextLine();
            
            //present the existed language list
            System.out.println("\r The language list");
            String lanList = "SELECT language_name FROM app_language;";

            Statement stmt2 = conn.createStatement();
            ResultSet rs2 = stmt2.executeQuery(lanList);
            ArrayList<String> lanNameList1 = new ArrayList<String>();
            
            while (rs2.next()) {
              lanNameList1.add(rs2.getString("language_name"));
            }
            System.out.println(lanNameList1);
            
            //ask an input of language
            Scanner textLan = new Scanner(System.in);
            System.out.print("\rPlease choose an approraite language in the list (with '' mark): ");
            String textLan1 = textLan.nextLine();
            
            //insert text
            String insertText = "call insert_text(" +
              textName1 + ", " + textDes1 + ", " + textCon1 + ", " + textGenre1 + ", " + textLan1 + ")";
            
            Statement stmt3 = conn.createStatement();
            stmt3.executeUpdate(insertText);
            
            System.out.print("\rThanks for your uploading! We have recorded your text resource!"
                + "\rIf you want to take other action, please log in the application again."
                + "Sorry for the inconvenience!");
            
            conn.close();
          }
          else if (userA3.equals("2")) {
            
            Scanner userQ4 = new Scanner(System.in);
            System.out.print("Please enter the name of text. We will show you all the available text."
                + "(with '' mark): ");
            String userA4 = userQ4.nextLine();
            
            //call procedure to find all match text
            String callFindText = "call find_text(" + userA4 + ")";
            Statement stmt4 = conn.createStatement();
            ResultSet rs4 = stmt4.executeQuery(callFindText);
          
            while (rs4.next()) {
              String id = rs4.getString("text_id");
              String name = rs4.getString("text_name");
              String des = rs4.getString("text_description");
              String genre = rs4.getString("text_genre");
              String lan = rs4.getString("text_language");
              System.out.println("\rID: " + id + "\rName:  " + name + 
                  "\rDescription: " + des + "\rGenre: " + genre + "\rLanguage: " + lan);
            }
            
            Scanner userQ5 = new Scanner(System.in);
            System.out.print("Please enter the ID of text that you prefer to read: ");
            int userA5 = userQ5.nextInt();
            
            String callFindCon = "call find_text_content(" + userA5 + ")";
            Statement stmt5 = conn.createStatement();
            ResultSet rs5 = stmt5.executeQuery(callFindCon);
            
            while (rs5.next()) {
              String content = rs5.getString("text_content");
              System.out.print("\rHere is the content of text: \r" + content + "\r");
            }
            
            //update history
            long d = System.currentTimeMillis();
            java.sql.Date date1 = new java.sql.Date(d);
            String date2 = "'" + date1 + "'";
            
            String insertHistory = "call update_history(" +
                date2 + ", " + userA1 + ", " + userA5 +")";
            Statement stmt6 = conn.createStatement();
            stmt6.executeUpdate(insertHistory);
            
            Scanner userQ6 = new Scanner(System.in);
            System.out.print("\rWould you like to download this text?\r"
                + "Please enter yes or no: ");
            String userA6 = userQ6.nextLine();
            
            if (userA6.equals("yes")) {
              System.out.print("\rHere is your download receipt:\r");
                   
              //update download 
              String insertDownload = "call update_download(" +
                  date2 + ", " + userA1 + ", " + userA5 +")";
              Statement stmt7 = conn.createStatement();
              stmt7.executeUpdate(insertDownload);
              
              int userA11 = Integer.parseInt(userA1);
              
              //return download receipt
              String callDownloadR = "call download_receipt(" + 
              date2 + ", " + userA11 + ", " + userA5 + ")";
              Statement stmt8 = conn.createStatement();
              ResultSet rs8 = stmt8.executeQuery(callDownloadR);
            
              while (rs8.next()) {
                String id = rs8.getString("download_id");
                String time = rs8.getString("download_time");
                String user_id = rs8.getString("user_id");
                String user_name = rs8.getString("user_name");
                String text_id = rs8.getString("text_id");
                String text_name = rs8.getString("text_name");
                System.out.println("\rID: " + id + "\rTime:  " + time + 
                    "\rUser ID: " + user_id + "\rUser Name: " + user_name +
                    "\rText ID: " + text_id + "\rText Name: " + text_name);
              }
              System.out.print("Thanks for using the application and downloading!"
                  + "We hope we provided a good experience to you!");
              conn.close();
            }
            else if (userA6.equals("no")) {
              System.out.print("Thanks for using the application!"
                  + "We hope you have a good time!");
              conn.close();
            }
          }
          else if(userA3.equals("3")) {
            System.out.print("Here is your reading history");
            //return user reading history
            String callDownloadR = "call user_reading_history(" + userA1 +")";
            Statement stmt9 = conn.createStatement();
            ResultSet rs9 = stmt9.executeQuery(callDownloadR);
          
            while (rs9.next()) {
              String id = rs9.getString("history_id");
              String time = rs9.getString("read_time");
              String user_id = rs9.getString("user_id");
              String user_name = rs9.getString("user_name");
              String text_id = rs9.getString("text_id");
              String text_name = rs9.getString("text_name");
              System.out.println("\rHistory ID: " + id + "\rTime:  " + time + 
                  "\rUser ID: " + user_id + "\rUser Name: " + user_name +
                  "\rText ID: " + text_id + "\rText Name: " + text_name);
            }
            System.out.print("\rIf you want to read or upload text, please log in again"
                + "and choose other option.\rSorry for inconvenience");
            conn.close();
          }
        }
        else {
          System.out.print("Sorry, your password is incorrect! Please resubmit or register as an user!");
        }
      }
      else if (Answer1.equals("no")) {
        System.out.print("\rWelcome to register as an user!\r"
            + "Please follow the requirements to regist.");
        
        Scanner userName = new Scanner(System.in);
        System.out.print("\rPlease enter your username (with '' mark): ");
        String userName1 = userName.nextLine();
        
        Scanner userPass = new Scanner(System.in);
        System.out.print("\rPlease enter a password (with '' mark),"
            + " which at most have 4 digit and could include any character and number: ");
        String userPass1 = userPass.nextLine();
        
        Scanner userFirstName = new Scanner(System.in);
        System.out.print("\rPlease enter your first name (with '' mark): ");
        String userFirstName1 = userFirstName.nextLine();
        
        Scanner userLastName = new Scanner(System.in);
        System.out.print("\rPlease enter your last name (with '' mark): ");
        String userLastName1 = userLastName.nextLine();
        
        Scanner userAge = new Scanner(System.in);
        System.out.print("\rPlease enter your age (an Integer): ");
        String userAge1 = userAge.nextLine();
        int age01 = Integer.parseInt(userAge1);
        
        Scanner userCountry = new Scanner(System.in);
        System.out.print("\rPlease enter your home country (with '' mark): ");
        String userCountry1 = userCountry.nextLine();
        
        //present the existed language list
        System.out.println("\r The language list");
        String lanList = "SELECT language_name FROM app_language;";

        Statement stmt01 = conn.createStatement();
        ResultSet rs01 = stmt01.executeQuery(lanList);
        ArrayList<String> lanNameList1 = new ArrayList<String>();
        
        while (rs01.next()) {
          lanNameList1.add(rs01.getString("language_name"));
        }
        System.out.println(lanNameList1);
        
        //ask an input of language
        Scanner userLan = new Scanner(System.in);
        System.out.print("\rPlease choose a default language in the list (with '' mark): ");
        String userLan1 = userLan.nextLine();
        
        //create a new user
        String insertUser = "call create_user(" +
            userName1 + ", " + userPass1 + ", " + userFirstName1 + ", " + userLastName1 + ", " + age01 +
            ", " + userCountry1 + ", " + userLan1 +")";
        
        Statement stmt02 = conn.createStatement();
        stmt02.executeUpdate(insertUser);
        
        System.out.print("\rThanks for registering! \r"
            + "Here is your user ID and password. Please use this when you log in."
            + "\rSince the username allow repeat, you only could use user ID and 4 digits Password to log in.\r");
      
        String selectMax = "SELECT MAX(user_id) AS user_id FROM project_user;";
        Statement stmt03 = conn.createStatement();
        ResultSet rs03 = stmt03.executeQuery(selectMax);
        
        int id = 0;
        while (rs03.next()) {
          id = rs03.getInt("user_id");
        }
        
        String selectUser = "SELECT user_id, user_name, user_password FROM project_user WHERE user_id = " + id + ";";
        
        Statement stmt04 = conn.createStatement();
        ResultSet rs04 = stmt04.executeQuery(selectUser);
        
        while (rs04.next()) {
          String id01 = rs04.getString("user_id");
          String name = rs04.getString("user_name");
          String pass = rs04.getString("user_password");
          System.out.print("\rUser ID: " + id01 + 
              "\rUsername: " + name + "\rPassword: " + pass);
        }
        conn.close();
      }
      else if (Answer1.equals("administrator")) {
        
        //enter ad_id
        Scanner userQ02 = new Scanner(System.in);
        System.out.print("Please enter your ad_id: ");
        String userA02 = userQ02.nextLine();
      
        //ask for password
        Scanner userQ03 = new Scanner(System.in);
        System.out.print("Please enter your password: \r");
        String userA03 = userQ03.nextLine();
      
        //check password
        String selectPass = "SELECT ad_password FROM administrator WHERE ad_id = " + userA02 +";";
      
        Statement stmt11 = conn.createStatement();
        ResultSet rs11 = stmt11.executeQuery(selectPass);
        String password11 = "";
      
        while (rs11.next()) {
          password11 = rs11.getString("ad_password");
        }
        
        if (password11.equals(userA03)) {
          Scanner userQ01 = new Scanner(System.in);
          System.out.print("\rWelcome back administrator! \r"
              + "What do you want to do? \r" + "1. Check all the user\r"
              + "2. Delete text that is not appropriate \r"
              + "3. Check delete history \r"
              + "4. Change your working update"
              + "Please enter your answer (1 or 2 or 3 or 4):  \r");
          String userA01 = userQ01.nextLine();
        
          if (userA01.equals("1")) {
            System.out.print("\rHere are all the users:\r");
            String allUser = "SELECT * FROM project_user;";
            Statement stmt10 = conn.createStatement();
            ResultSet rs10 = stmt10.executeQuery(allUser);
          
            while (rs10.next()) {
              String id = rs10.getString("user_id");
              String user_name = rs10.getString("user_name");
              String user_pass = rs10.getString("user_password");
              String first_name = rs10.getString("first_name");
              String last_name = rs10.getString("last_name");
              String age = rs10.getString("age");
              String country = rs10.getString("country");
              String default_language = rs10.getString("default_language");
              System.out.println("\rUser ID: " + id  + "\rUser Name: " + user_name + 
                  "\rUser Password: " + user_pass + "\rFirst_name: " + first_name + 
                  "\rLast_name: " + last_name + "\rAge: " + age
                  + "\rCountry: " + country + "\rDefault_language: " + default_language);
            }
            conn.close();
          }
          else if (userA01.equals("2")) {
            System.out.print("\rHere are all the texts:\r");
            String allText = "SELECT * FROM text;";
            Statement stmt12 = conn.createStatement();
            ResultSet rs12 = stmt12.executeQuery(allText);
          
            while (rs12.next()) {
              String id = rs12.getString("text_id");
              String text_name = rs12.getString("text_name");
              String text_description = rs12.getString("text_description");
              String text_content = rs12.getString("text_content");
              String text_genre = rs12.getString("text_genre");
              String text_language = rs12.getString("text_language");
              System.out.println("\rText ID: " + id  + "\rText Name: " + text_name + 
                  "\rText description: " + text_description + "\rText_content: " + text_content + 
                  "\rText_genre: " + text_genre + "\rText_language: " + text_language);
            }
            Scanner userQ04 = new Scanner(System.in);
            System.out.print("Please enter text_id to delete the text: ");
            String userA04 = userQ04.nextLine();
            
            String deleteText = "delete from text where text_id =" + userA04 + ";";
            Statement stmt18 = conn.createStatement();
            stmt18.executeUpdate(deleteText);
            
            Scanner userQ05 = new Scanner(System.in);
            System.out.print("Please enter the reason of deleting: ");
            String userA05 = userQ05.nextLine();
            
            long d = System.currentTimeMillis();
            java.sql.Date date1 = new java.sql.Date(d);
            String date2 = "'" + date1 + "'";
            
            String updateDelete = "call update_delete_reason(" +
                userA04 + ", " + userA02 + ", " + date2 + ", " + userA05 +")";
            Statement stmt13 = conn.createStatement();
            stmt13.executeUpdate(updateDelete);
            
            System.out.print("Thanks for your work! Have a good day!");
            conn.close();
          }
          else if (userA01.equals("3")) {
            System.out.print("\rHere are all the deleted texts:\r");
            String allDeleted = "SELECT * FROM delete_text;";
            Statement stmt14 = conn.createStatement();
            ResultSet rs14 = stmt14.executeQuery(allDeleted);
          
            while (rs14.next()) {
              String id = rs14.getString("text_id");
              String text_name = rs14.getString("text_name");
              String ad_id = rs14.getString("ad_id");
              String delete_time = rs14.getString("delete_time");
              String delete_reason = rs14.getString("delete_reason");
              System.out.println("\rText ID: " + id  + "\rText Name: " + text_name  + 
                  "\rAd_id: " + ad_id + "\rDelete time: " + delete_time + 
                  "\rDeletereason: " + delete_reason);
            }
            conn.close();
          }
          else if (userA01.equals("4")) {
            String workPeriod = "SELECT work_period FROM administrator where ad_id = " + userA02 + ";";
            Statement stmt15 = conn.createStatement();
            ResultSet rs15 = stmt15.executeQuery(workPeriod);
            String w = "";
            
            while (rs15.next()) {
              w = rs15.getString("work_period");
            }
            System.out.print("\rHere is your present working period: " + w);
            
            Scanner userQ06 = new Scanner(System.in);
            System.out.print("\rWhat period would you like to change? (with '' mark): ");
            String userA06 = userQ06.nextLine();
            
            String updateWork = "UPDATE administrator SET work_period = " +
                userA06 + "WHERE ad_id = " + userA02 +";";
            Statement stmt16 = conn.createStatement();
            stmt16.executeUpdate(updateWork);
            
            String workPeriod1 = "SELECT after_changeing_work_period(" + userA02 + ") AS changed_work_period;";
            Statement stmt17 = conn.createStatement();
            ResultSet rs17 = stmt17.executeQuery(workPeriod1);
            
            while (rs17.next()) {
              String w1 = rs17.getString("changed_work_period");
              System.out.print("\rYour current work period is " + w1);
            }
            System.out.print("\rAll the change have been done!");
            conn.close();
          } 
        }
        else {
          System.out.print("Sorry, your password is incorrect! Please check your ad_id or password!");
        }
      } 
    }catch (SQLException e) {
      System.out.println("Invaild action");
      e.printStackTrace();
      return;
    }
    /*
    catch (FileNotFoundException e) {
      System.out.print("Cannot find content.");
      e.printStackTrace();
    }*/
   }
  
  public static void main(String[] args) {
    project app = new project();
    app.run();
   
  }
}