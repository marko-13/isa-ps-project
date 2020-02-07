package com.proj.medicalClinic.selenium;

import lombok.Getter;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

@Getter
public class PatientSelectDoctorAndTimePage {

    private WebDriver driver;

    public PatientSelectDoctorAndTimePage(WebDriver driver){
        this.driver = driver;
    }

    @FindBy(id = "inspect_clinics_reserve_button")
    private WebElement reserveSubmitButton;

    public void ensureReserveSubmitButtonIsClickable() {
        (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.elementToBeClickable(reserveSubmitButton));
    }

}
