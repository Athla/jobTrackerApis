import { JobStatus, JobType } from "../types"

export interface Job {
	Id: number
	Name: string
	Company?: string
	Source?: string
	Description: string
	JobType: JobType
	Status: JobStatus
	Version: number
	CreatedAt: Date
	UpdatedAt: Date
}




//
//const (
//	// Job Types
//	FullTime   JobType = "FULL_TIME"
//	PartTime   JobType = "PART_TIME"
//	Contract   JobType = "CONTRACT"
//	Internship JobType = "INTERNSHIP"
//	Remote     JobType = "REMOTE"
//
//	// Job Status
//	Wishlist           JobStatus = "WISHLIST"
//	Applied            JobStatus = "APPLIED"
//	PhoneScreen        JobStatus = "PHONE_SCREEN"
//	TechnicalInterview JobStatus = "TECHNICAL_INTERVIEW"
//	Onsite             JobStatus = "ONSITE"
//	Offer              JobStatus = "OFFER"
//	Rejected           JobStatus = "REJECTED"
//	Accepted           JobStatus = "ACCEPTED"
//	Withdrawn          JobStatus = "WITHDRAWN"
//)
//
