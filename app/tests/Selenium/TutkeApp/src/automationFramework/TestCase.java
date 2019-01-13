package automationFramework;


import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TestCase {
 
	public static void main(String[] args) throws InterruptedException { 
		 
		WebDriver driver = setUpDriver();
		start(driver);
		registrationFailedReCAPTCHA(driver);
	    navigateToMainPage(driver);
	    logInSuccesful(driver);
		searchByKeyword(driver);
		addLecture(driver);
		deleteLastAddedLecture(driver);
		quit(driver);
    }
	
	public static WebDriver setUpDriver(){
		 
		//define path
		String path = "drivers/chromedriver";
		System.setProperty("webdriver.chrome.driver", path);
		
		// Creates a new instance of the chrome driver
		WebDriver driver = new ChromeDriver();
		
		return driver;
	 
	}
	
	public static void start(WebDriver driver) {
		 
		//Launch the app
		driver.get("https://tutke-io.herokuapp.com/");
		 
		if(driver.getTitle().contentEquals("Tutke.io")) {
			// Print to screen
			System.out.println("[OK] Successfully opened the website https://tutke-io.herokuapp.com");
		} else {
			System.out.println("[error]");
		}
		
		//maximize
		driver.manage().window().maximize();
		System.out.println("[OK] Maximised window");
	    
    }

	public static void quit(WebDriver driver) {
		 
		//quit chrome
		driver.quit();
		System.out.println("[OK] Driver quit");
		
    }

	public static void navigateToMainPage(WebDriver driver) {
		 
		//quit chrome
		driver.navigate().to("https://tutke-io.herokuapp.com/");
		System.out.println("[OK] Navigated back to main page");
		
    }
	
	public static void registrationFailedReCAPTCHA(WebDriver driver) throws InterruptedException {
		 
		//navigates to registration
		//wait for the page to load
		Thread.sleep(5000);
		driver.findElement(By.id("userIconToggle")).click();
		Thread.sleep(2000);
		
		driver.findElement(By.xpath("//*[@id=\"userIconToggle\"]/ul/li[2]")).click();
		Thread.sleep(2000);
		
		
		//student registration
		driver.findElement(By.xpath("//*[@id=\"signupNavTabs\"]/li[2]")).click();
		Thread.sleep(2000);
		
		//
		driver.findElement(By.id("firstName2")).click();
		driver.findElement(By.id("firstName2")).clear();
		driver.findElement(By.id("firstName2")).sendKeys("Meta");
		Thread.sleep(2000);

		driver.findElement(By.id("lastName2")).click();
		driver.findElement(By.id("lastName2")).clear();
		driver.findElement(By.id("lastName2")).sendKeys("Janežič");
		Thread.sleep(2000);
		
		WebElement usname = driver.findElement(By.xpath("//*[@id=\"Student\"]/form/div[3]/input"));
		Actions action = new Actions(driver);
		action.moveToElement(usname);

		//WebDriverWait wait = new WebDriverWait(driver, 30);
	    //WebElement usname = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username1")));
	    usname.click();
	    usname.clear();
	    usname.sendKeys("mjanezic");
		
	    /*cant find by id since its not unique
	    
	    driver.findElement(By.id("username1")).click();
		driver.findElement(By.id("username1")).clear();
		driver.findElement(By.id("username1")).sendKeys("mjanezic");*/
		Thread.sleep(2000);
		
		driver.findElement(By.id("password3")).sendKeys("Geslo123");
		Thread.sleep(2000);

		driver.findElement(By.id("password4")).sendKeys("Geslo123");
		Thread.sleep(2000);

		driver.findElement(By.id("email2")).sendKeys("meta.janezic@gmail.com");
		Thread.sleep(2000);

		driver.findElement(By.id("educationLevel2")).click();
		Thread.sleep(2000);
		
		driver.findElement(By.xpath("//*[@id=\"educationLevel2\"]/option[9]")).click();
		Thread.sleep(2000);
		

		driver.findElement(By.id("fieldOfEducation2")).sendKeys("Computer Science");
		Thread.sleep(2000);
		
		driver.findElement(By.xpath("//*[@id=\"Student\"]/form/div[9]/div/div/div/iframe")).click();
		Thread.sleep(4000);
		
		driver.findElement(By.id("signupBtn1")).submit();
		Thread.sleep(6000);
		
		String iAmHere = driver.getCurrentUrl();
		if (!iAmHere.contentEquals("https://tutke-io.herokuapp.com/")) {
			System.out.println("[OK] Registration failed due to ReCAPTCHA. Currently at url " + iAmHere);
		} else {
			System.out.println("[error] Registration did not fail but should have. Currently at url " + iAmHere);
		}
		
		Thread.sleep(7000);
		
    }
	
	public static void logInSuccesful(WebDriver driver) throws InterruptedException {
		 
		//navigates to login
		//wait for the page to load
		Thread.sleep(5000);
		driver.findElement(By.id("userIconToggle")).click();
		Thread.sleep(2000);
		
		driver.findElement(By.xpath("//*[@id=\"userIconToggle\"]/ul/li[1]")).click();
		Thread.sleep(2000);
		
		
		//login as tutor1 with password Password1
		WebElement usname = driver.findElement(By.xpath("/html/body/div/div/div/div/div/form/div[1]/input"));
		usname.click();
	    usname.clear();
	    usname.sendKeys("tutor1");
		Thread.sleep(2000);
		
		WebElement psw = driver.findElement(By.xpath("/html/body/div/div/div/div/div/form/div[2]/input"));
		psw.click();
	    psw.clear();
	    psw.sendKeys("Password1");
		Thread.sleep(2000);
		
		
		driver.findElement(By.id("loginBtn")).submit();
		Thread.sleep(4000);
		
		String iAmHere = driver.getCurrentUrl();
		//System.out.println("[OK] Logged in + currently at url " + iAmHere);
		
		Thread.sleep(3000);
		
		if (iAmHere.contentEquals("https://tutke-io.herokuapp.com/")) {
			System.out.println("[OK] Log in succasful, back at url " + iAmHere);
		} else {
			System.out.println("[error] Log in unsuccesful. Currently at url " + iAmHere);
		}
		
    }
	
	public static void searchByKeyword(WebDriver driver) throws InterruptedException {
		
		Thread.sleep(3000);
		
		WebElement searchBar = driver.findElement(By.xpath("//*[@id=\"searchTutor\"]/div/input"));
		searchBar.click();
		searchBar.clear();
		searchBar.sendKeys("java");
		
		Thread.sleep(3000);
		driver.findElement(By.id("btnSearch")).click();
		Thread.sleep(3000);
		
		List<WebElement> searchResults = driver.findElements(By.id("adTitle"));
		boolean javaInEveryTitle = true;
		for (int i = 0; i < searchResults.size(); i++) {
			//System.out.println(searchResults.get(i));
			if (searchResults.get(i).getText().toLowerCase().contains("java")) {
				System.out.println("contains keyword");
			} else {
				javaInEveryTitle = false;
			}
		}
		
		if(javaInEveryTitle) {
			// Print to screen
			System.out.println("[OK] Search by keyword succesful");
		} else {
			System.out.println("[error] Search by keyword unsuccesful");
		}
	}
	
	public static void addLecture(WebDriver driver) throws InterruptedException {
		
		//Thread.sleep(3000);
		
		driver.findElement(By.xpath("/html/body/div/a")).click();
		Thread.sleep(2000);

		WebElement title = driver.findElement(By.xpath("/html/body/div[1]/div/div/form/div[1]/div/div/input"));
		title.click();
		title.clear();
		title.sendKeys("Learn C#.");
		Thread.sleep(2000);
		
		WebElement price = driver.findElement(By.xpath("/html/body/div[1]/div/div/form/div[2]/div/div/input"));
		price.click();
		price.clear();
		price.sendKeys("12");
		Thread.sleep(2000);
		
		WebElement description = driver.findElement(By.xpath("//*[@id=\"modal-message\"]"));
		description.click();
		description.clear();
		String desc = "There are many variations of passages of Lorem Ipsum available, "
				+ "but the majority have suffered alteration in some form, "
				+ "by injected humour, or randomised words which don't "
				+ "look even slightly believable. If you are going to use a "
				+ "passage of Lorem Ipsum, you need to be sure there isn't "
				+ "anything embarrassing hidden in the middle of text. "
				+ "All the Lorem Ipsum generators on the Internet tend to "
				+ "repeat predefined chunks as necessary, making this "
				+ "the first true generator on the Internet. It uses a dictionary"
				+ " of over 200 Latin words, combined with a handful of model sentence "
				+ "structures, to generate Lorem Ipsum which looks reasonable. "
				+ "The generated Lorem Ipsum is therefore always free from repetition, "
				+ "injected humour, or non-characteristic words etc.";
		description.sendKeys(desc);
		Thread.sleep(2000);
		
		driver.findElement(By.id("signupBtn")).submit();
		Thread.sleep(2000);
		
		if (driver.findElement(By.className("alert-success")).isDisplayed()) {
			System.out.println("[OK] Lecture added");
		} else {
			System.out.println("[error] Lecture not added");
		}
		
		driver.navigate().refresh();
		Thread.sleep(2000);
		
		//Thread.sleep(3000);
		
	}
	
	public static void deleteLastAddedLecture(WebDriver driver) throws InterruptedException {
		 
		//navigates to profile
		//wait for the page to load
		Thread.sleep(4000);
		driver.findElement(By.id("userIconToggle")).click();
		Thread.sleep(2000);
		
		driver.findElement(By.xpath("//*[@id=\"userIconToggle\"]/ul/li[1]/a")).click();
		Thread.sleep(2000);
		
		WebElement deletedPost = driver.findElement(By.xpath("//*[@id=\"rightColumn\"]/div[7]/div[2]/div/h3/span/button[2]"));
		((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", deletedPost);
		Thread.sleep(2000);
		deletedPost.click();
		
		Thread.sleep(2000);
		WebElement success = driver.findElement(By.className("alert-success"));
		((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", success);
		Thread.sleep(2000);
		if (success.isDisplayed()) {
			System.out.println("[OK] Lecture deleted");
		} else {
			System.out.println("[error] Lecture not deleted");
		}
		
		
		Thread.sleep(7000);
		
    }
	
	
}