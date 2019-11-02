package com.proj.medicalClinic.model;

import java.util.Date;
import java.util.UUID;

public class Leave {
	private UUID id;
	private Date dateStart;
	private Date dateEnd;
	
	public Leave() {
		
	}
	
	public Leave(UUID id, Date dateStart, Date dateEnd) {
		super();
		this.id = id;
		this.dateStart = dateStart;
		this.dateEnd = dateEnd;
	}
	
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public Date getDateStart() {
		return dateStart;
	}
	public void setDateStart(Date dateStart) {
		this.dateStart = dateStart;
	}
	public Date getDateEnd() {
		return dateEnd;
	}
	public void setDateEnd(Date dateEnd) {
		this.dateEnd = dateEnd;
	}

	@Override
	public String toString() {
		return "Leave [id=" + id + ", dateStart=" + dateStart + ", dateEnd=" + dateEnd + "]";
	}
	
}
