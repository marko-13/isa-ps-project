package com.proj.medicalClinic.selenium;

import lombok.Getter;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

@Getter
public class PatientAllClinics {

    private WebDriver driver;

    public PatientAllClinics(WebDriver driver){
        this.driver = driver;
    }

    @FindBy(className = "rbt-input-main")
    private WebElement serviceInput;

    public void setServiceInput(String input){
        WebElement e2 = getServiceInput();
        e2.clear();
        e2.sendKeys(input);
    }

    public void ensureServiceInputIsDisplayed() {
        (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.elementToBeClickable(serviceInput));
    }

}
