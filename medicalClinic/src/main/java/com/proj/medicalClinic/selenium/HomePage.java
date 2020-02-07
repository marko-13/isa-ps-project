package com.proj.medicalClinic.selenium;

import lombok.Getter;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

@Getter
public class HomePage {

    private WebDriver driver;

    public HomePage(WebDriver driver){
        this.driver = driver;
    }

    @FindBy(id = "user_homepage_container")
    private WebElement userHomepageContainer;

    @FindBy(id = "inspect_clinics_allClinics_table")
    private WebElement allClinicsTable;

    @FindBy(id = "inspect_clinics_appointment_form")
    private WebElement appointmentDateAndTypeForm;

    @FindBy(xpath = "//button[text()='Inspect clinics']")
    private WebElement inspectClinicsButton;

    public void ensureInspectClinicsButtonIsClickable() {
        (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.elementToBeClickable(inspectClinicsButton));
    }

    public void ensureIsDisplayed(){
        (new WebDriverWait(driver, 5)).until(ExpectedConditions.visibilityOf(userHomepageContainer));
    }

    public void ensureClinicsAreDisplayed(){
        (new WebDriverWait(driver, 5)).until(ExpectedConditions.visibilityOf(allClinicsTable));
    }

    public void ensureFromAppointmentFormIsDisplayed(){
        (new WebDriverWait(driver, 5)).until(ExpectedConditions.visibilityOf(appointmentDateAndTypeForm));
    }
}
