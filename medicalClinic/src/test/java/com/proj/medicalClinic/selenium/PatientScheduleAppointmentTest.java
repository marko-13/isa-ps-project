package com.proj.medicalClinic.selenium;


import lombok.Getter;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import static org.junit.Assert.*;
import static org.junit.Assert.assertTrue;

@Getter
public class PatientScheduleAppointmentTest {

    private WebDriver browser;
    private PatientAllClinicsPage inspectClinicsPage;
    private WelcomePage welcomePage;
    private HomePage homePage;
    private PatientSelectClinicPage patientSelectClinicPage;
    private PatientSelectDoctorAndTimePage patientSelectDoctorAndTimePage;

    private static final String baseUrl = "http://localhost:3000";

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "src/test/resources/chromedriver.exe");
        browser = new ChromeDriver();

        browser.manage().window().maximize();
        browser.navigate().to(baseUrl);

        welcomePage = PageFactory.initElements(browser, WelcomePage.class);
        inspectClinicsPage = PageFactory.initElements(browser, PatientAllClinicsPage.class);
        homePage = PageFactory.initElements(browser, HomePage.class);
        patientSelectClinicPage = PageFactory.initElements(browser, PatientSelectClinicPage.class);
        patientSelectDoctorAndTimePage = PageFactory.initElements(browser, PatientSelectDoctorAndTimePage.class);

    }

    @Test
    public void noTimeSelectedForSelectedClinic(){
        this.loginValid();

        this.clinicsShown();

        inspectClinicsPage.ensureServiceInputIsDisplayed();
        assertTrue(inspectClinicsPage.getServiceInput().isDisplayed());

        inspectClinicsPage.setServiceInput("Pregled glave");
        inspectClinicsPage.getSelectedItem().click();

        inspectClinicsPage.ensureInputDateIsDisplayed();
        assertTrue(inspectClinicsPage.getDateInput().isDisplayed());

        inspectClinicsPage.setDateInput("26-Feb-2020");
        inspectClinicsPage.getDateInput().sendKeys(Keys.ENTER);

        inspectClinicsPage.ensureSubmitButtonIsClickable();
        assertTrue(inspectClinicsPage.getSubmitButton().isDisplayed());
        inspectClinicsPage.getSubmitButton().click();

        patientSelectClinicPage.ensureSelectButtonClinicIsClickable();
        assertTrue(patientSelectClinicPage.getSelectClinicButton().isDisplayed());
        patientSelectClinicPage.getSelectClinicButton().click();

        patientSelectDoctorAndTimePage.ensureReserveSubmitButtonIsClickable();
        assertTrue(getPatientSelectDoctorAndTimePage().getReserveSubmitButton().isDisplayed());
        patientSelectDoctorAndTimePage.getReserveSubmitButton().click();

        assertEquals(browser.switchTo().alert().getText(), "Time must be selected");
        browser.switchTo().alert().dismiss();

    }

//    @Test
//    public void noDateSelected() {
//
//        this.loginValid();
//
//        this.clinicsShown();
//
//        inspectClinicsPage.ensureServiceInputIsDisplayed();
//        assertTrue(inspectClinicsPage.getServiceInput().isDisplayed());
//
//        inspectClinicsPage.setServiceInput("Pregled glave");
//        inspectClinicsPage.getSelectedItem().click();
//
//        inspectClinicsPage.ensureSubmitButtonIsClickable();
//        assertTrue((inspectClinicsPage.getSubmitButton().isDisplayed()));
//        inspectClinicsPage.getSubmitButton().click();
//
//        assertEquals(browser.switchTo().alert().getText(), "Date must be selected");
//        browser.switchTo().alert().dismiss();
//
//    }
//
//    @Test
//    public void noServiceSelected(){
//        this.loginValid();
//
//        this.clinicsShown();
//
//        inspectClinicsPage.ensureInputDateIsDisplayed();
//        assertTrue(inspectClinicsPage.getDateInput().isDisplayed());
//
//        inspectClinicsPage.setDateInput("26-Feb-2020");
//        inspectClinicsPage.getDateInput().sendKeys(Keys.ENTER);
//
//        inspectClinicsPage.ensureSubmitButtonIsClickable();
//        assertTrue((inspectClinicsPage.getSubmitButton().isDisplayed()));
//        inspectClinicsPage.getSubmitButton().click();
//
//        assertEquals(browser.switchTo().alert().getText(), "Service must be selected");
//        browser.switchTo().alert().dismiss();
//
//
//    }



    private void loginValid(){
        welcomePage.ensureLoginButtonIsClickable();

        welcomePage.setUsernameInput("Miljana@mailinator.com");
        welcomePage.setPasswordInput("miljana");
        welcomePage.getLoginButton().click();

        assertTrue(welcomePage.getLoginButton().isEnabled());

        (new WebDriverWait(browser, 8)).until(ExpectedConditions.urlContains("/homepage"));
        assertEquals(baseUrl + "/homepage", browser.getCurrentUrl());
    }

    private void clinicsShown(){

        homePage.ensureIsDisplayed();
        assertTrue(homePage.getUserHomepageContainer().isDisplayed());

        homePage.ensureInspectClinicsButtonIsClickable();
        assertTrue(homePage.getInspectClinicsButton().isDisplayed());

        homePage.getInspectClinicsButton().click();
        assertTrue(homePage.getInspectClinicsButton().isEnabled());

        homePage.ensureClinicsAreDisplayed();
        assertTrue(homePage.getAllClinicsTable().isDisplayed());

        homePage.ensureFromAppointmentFormIsDisplayed();
        assertTrue(homePage.getAppointmentDateAndTypeForm().isDisplayed());

        (new WebDriverWait(browser, 8)).until(ExpectedConditions.urlContains("/homepage/patient/clinics"));
        assertEquals(baseUrl + "/homepage/patient/clinics", browser.getCurrentUrl());
    }

    @AfterMethod
    public void shutDown(){
        browser.close();
    }


}
