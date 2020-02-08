package com.proj.medicalClinic.selenium;

import lombok.Getter;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

@Getter
public class AdminClinicRequestsPage {

    private WebDriver driver;

    public AdminClinicRequestsPage(WebDriver driver){
        this.driver = driver;
    }

    @FindBy(xpath = "//*[@id='user_homepage_container']/div[2]/div[1]/div")
    private WebElement requestTable;

    @FindBy(xpath = "//*[@id='user_homepage_container']/div[2]/div[1]/div/div[1]/div[3]/div/div[5]/input")
    private WebElement patientInputSearch;

    @FindBy(xpath = "//*[@id='user_homepage_container']/div[2]/div[1]/div/div[1]/div[3]/div/div[2]/input")
    private WebElement dateInputSearch;

    @FindBy(xpath = "//*[@id='user_homepage_container']/div[2]/div[1]/div/div[1]/div[3]/div/div[4]/input")
    private WebElement serviceInputSerach;

    @FindBy(xpath = "//*[@id='user_homepage_container']/div[2]/div[1]/div/div[1]/div[4]/div[1]/div/div[6]/center/button")
    private WebElement serachRoomButton;



    public void ensureSerachRoomButtonIsClickable() {
        (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.elementToBeClickable(serachRoomButton));
    }

    public void setServiceInputSerach(String input){
        WebElement e2 = getServiceInputSerach();
        e2.clear();
        e2.sendKeys(input);
    }


    public void setPatientInputSearch(String input){
        WebElement e2 = getPatientInputSearch();
        e2.clear();
        e2.sendKeys(input);
    }

    public void setDateInputSearch(String input){
        WebElement e2 = getDateInputSearch();
        e2.clear();
        e2.sendKeys(input);
    }


    public void ensureRequestTableIsDisplayed() {
        (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.visibilityOf(requestTable));
    }
}
