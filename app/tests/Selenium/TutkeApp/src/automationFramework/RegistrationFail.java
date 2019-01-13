package automationFramework;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class RegistrationFail {

	public static void main(String[] args) throws InterruptedException {
		 
		//ta registracija pade zaradi 
		String exePath = "drivers/chromedriver";
		System.setProperty("webdriver.chrome.driver", exePath);
		
		// Creates a new instance of the chrome driver
		WebDriver driver = new ChromeDriver();
	 
		//Launch the app
		driver.get("https://tutke-io.herokuapp.com");
		  
	    //Wait for 5 Sec
		Thread.sleep(3000);
		
		String title = driver.getTitle();
		//System.out.println("[OK] Successfully opened the website https://tutke-io.herokuapp.com");
		
		if(title.contentEquals("Tutke.io")) {
			// Print a Log In message to the screen
			System.out.println("[OK] Successfully opened the website https://tutke-io.herokuapp.com");
		} else {
			System.out.println("[napaka]");
		}
		
		//navigates to registration
		driver.findElement(By.id("userIconToggle")).click();
		Thread.sleep(2000);
		
		driver.findElement(By.xpath("//*[@id=\"userIconToggle\"]/ul/li[2]")).click();
		Thread.sleep(2000);
		
		
		//student registration
		driver.findElement(By.xpath("//*[@id=\"signupNavTabs\"]/li[2]")).click();
		Thread.sleep(2000);
		
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
		
	    /*po id ne najde ker imata isti id
	     * driver.findElement(By.id("username1")).click();
		driver.findElement(By.id("username1")).clear();
		driver.findElement(By.id("username1")).sendKeys("mjanezic");*/
		Thread.sleep(2000);
		
		driver.findElement(By.id("password3")).sendKeys("geslo1");
		Thread.sleep(2000);

		driver.findElement(By.id("password4")).sendKeys("geslo1");
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
		
		
		
		Thread.sleep(7000);
		
		// Close the driver
	    driver.quit();
	    
    }

}
