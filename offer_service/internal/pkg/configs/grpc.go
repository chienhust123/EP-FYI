package configs

type GRPC struct {
	Address                   string                    `yaml:"address"`
	CreateCompanyProfileImage CreateCompanyProfileImage `yaml:"create_company_profile_image"`
	CreateOfferImage          CreateOfferImage          `yaml:"create_offer_image"`
}

type CreateCompanyProfileImage struct {
	BucketName           string `yaml:"bucket_name"`
	PresignURLExpiryTime string `yaml:"presign_url_expiry_time"`
	Location             string `yaml:"location"`
}

type CreateOfferImage struct {
	BucketName           string `yaml:"bucket_name"`
	PresignURLExpiryTime string `yaml:"presign_url_expiry_time"`
	Location             string `yaml:"location"`
}
