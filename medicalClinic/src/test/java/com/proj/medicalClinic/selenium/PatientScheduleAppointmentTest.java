package com.proj.medicalClinic.selenium;


import lombok.Getter;
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
    private PatientAllClinics inspectClinicsPage;
    private WelcomePage welcomePage;
    private HomePage homePage;

    private static final String baseUrl = "http://localhost:3000";

    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "src/test/resources/chromedriver.exe");
        browser = new ChromeDriver();

        browser.manage().window().maximize();
        browser.navigate().to(baseUrl);

        welcomePage = PageFactory.initElements(browser, WelcomePage.class);
        inspectClinicsPage = PageFactory.initElements(browser, PatientAllClinics.class);
        homePage = PageFactory.initElements(browser, HomePage.class);

    }

    @Test
    public void noMatchForSelectedService() {

        this.loginValid();

        this.clinicsShown();

        inspectClinicsPage.ensureServiceInputIsDisplayed();
        assertTrue(inspectClinicsPage.getServiceInput().isDisplayed());

        inspectClinicsPage.setServiceInput("Testiram");


    }

    private void loginValid(){
        welcomePage.ensureLoginButtonIsDisplayed();

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

        homePage.ensureInspectClinicsButtonIsDisplayed();
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
