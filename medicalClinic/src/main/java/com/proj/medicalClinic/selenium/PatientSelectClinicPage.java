package com.proj.medicalClinic.selenium;

import lombok.Getter;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

@Getter
public class PatientSelectClinicPage {

    private WebDriver driver;

    public PatientSelectClinicPage(WebDriver driver){
        this.driver = driver;
    }


    @FindBy(id = "select_clinic_1_button")
    private WebElement selectClinicButton;

    public void ensureSelectButtonClinicIsClickable() {
        (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.elementToBeClickable(selectClinicButton));
    }
}
