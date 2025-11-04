-- CreateTable
CREATE TABLE `alert` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eventalert` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `alert_id` BIGINT NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    UNIQUE INDEX `EventAlert_alert_id_key`(`alert_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eventinquiry` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `inquiry_id` BIGINT NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    UNIQUE INDEX `EventInquiry_inquiry_id_key`(`inquiry_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `foodcategory` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquiry` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `is_completed` BOOLEAN NOT NULL,
    `type` INTEGER NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    INDEX `Inquiry_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquirypicture` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `inquiry_id` BIGINT NOT NULL,
    `picture` VARCHAR(255) NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    INDEX `InquiryPicture_inquiry_id_fkey`(`inquiry_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `store_id` BIGINT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `payment` INTEGER NOT NULL,
    `point` INTEGER NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    INDEX `Mission_store_id_fkey`(`store_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `missionalert` (
    `alert_id` BIGINT NOT NULL,
    `mission_id` BIGINT NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    INDEX `MissionAlert_mission_id_fkey`(`mission_id`),
    PRIMARY KEY (`alert_id`, `mission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `missioninquiry` (
    `inquiry_id` BIGINT NOT NULL,
    `mission_id` BIGINT NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    INDEX `MissionInquiry_mission_id_fkey`(`mission_id`),
    PRIMARY KEY (`inquiry_id`, `mission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `preferfood` (
    `user_id` BIGINT NOT NULL,
    `food_category_id` BIGINT NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    INDEX `PreferFood_food_category_id_fkey`(`food_category_id`),
    PRIMARY KEY (`user_id`, `food_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `region` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `store_id` BIGINT NOT NULL,
    `score` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    INDEX `Review_store_id_fkey`(`store_id`),
    INDEX `Review_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviewalert` (
    `alert_id` BIGINT NOT NULL,
    `review_id` BIGINT NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    INDEX `ReviewAlert_review_id_fkey`(`review_id`),
    PRIMARY KEY (`alert_id`, `review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviewinquiry` (
    `inquiry_id` BIGINT NOT NULL,
    `review_id` BIGINT NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    INDEX `ReviewInquiry_review_id_fkey`(`review_id`),
    PRIMARY KEY (`inquiry_id`, `review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `region_id` BIGINT NOT NULL,
    `food_category_id` BIGINT NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    INDEX `Store_food_category_id_fkey`(`food_category_id`),
    INDEX `Store_region_id_fkey`(`region_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `storepicture` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `store_id` BIGINT NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    INDEX `StorePicture_store_id_fkey`(`store_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `term` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `term_url` VARCHAR(255) NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,
    `essential` BOOLEAN NOT NULL,

    INDEX `Term_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `pw` VARCHAR(20) NOT NULL,
    `status` VARCHAR(10) NULL,
    `point` INTEGER NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,
    `inactive_date` DATETIME(6) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `useralert` (
    `user_id` BIGINT NOT NULL,
    `alert_id` BIGINT NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    INDEX `UserAlert_alert_id_fkey`(`alert_id`),
    PRIMARY KEY (`user_id`, `alert_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userinfo` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `profile_picture_url` VARCHAR(255) NOT NULL,
    `email` VARCHAR(20) NOT NULL,
    `locate` VARCHAR(20) NOT NULL,
    `gender` INTEGER NOT NULL,
    `birth` VARCHAR(20) NOT NULL,
    `phone_num` VARCHAR(20) NOT NULL,
    `phone_num_certificated` BOOLEAN NOT NULL,
    `nickname` VARCHAR(50) NULL DEFAULT 'NICKNAME123',
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    UNIQUE INDEX `UserInfo_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usermission` (
    `user_id` BIGINT NOT NULL,
    `mission_id` BIGINT NOT NULL,
    `is_completed` BOOLEAN NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    INDEX `UserMission_mission_id_fkey`(`mission_id`),
    PRIMARY KEY (`user_id`, `mission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userreview` (
    `user_id` BIGINT NOT NULL,
    `review_id` BIGINT NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,

    INDEX `UserReview_review_id_fkey`(`review_id`),
    PRIMARY KEY (`user_id`, `review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userterm` (
    `user_id` BIGINT NOT NULL,
    `term_id` BIGINT NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,
    `agreed` BOOLEAN NOT NULL,

    INDEX `UserTerm_term_id_fkey`(`term_id`),
    PRIMARY KEY (`user_id`, `term_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usertoken` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `access_token` VARCHAR(255) NOT NULL,
    `refresh_token` VARCHAR(255) NOT NULL,
    `created_time` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_time` DATETIME(6) NOT NULL,
    `category` VARCHAR(50) NOT NULL,

    INDEX `UserToken_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `eventalert` ADD CONSTRAINT `EventAlert_alert_id_fkey` FOREIGN KEY (`alert_id`) REFERENCES `alert`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eventinquiry` ADD CONSTRAINT `EventInquiry_inquiry_id_fkey` FOREIGN KEY (`inquiry_id`) REFERENCES `inquiry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquiry` ADD CONSTRAINT `Inquiry_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquirypicture` ADD CONSTRAINT `InquiryPicture_inquiry_id_fkey` FOREIGN KEY (`inquiry_id`) REFERENCES `inquiry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `Mission_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `missionalert` ADD CONSTRAINT `MissionAlert_alert_id_fkey` FOREIGN KEY (`alert_id`) REFERENCES `alert`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `missionalert` ADD CONSTRAINT `MissionAlert_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `missioninquiry` ADD CONSTRAINT `MissionInquiry_inquiry_id_fkey` FOREIGN KEY (`inquiry_id`) REFERENCES `inquiry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `missioninquiry` ADD CONSTRAINT `MissionInquiry_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `preferfood` ADD CONSTRAINT `PreferFood_food_category_id_fkey` FOREIGN KEY (`food_category_id`) REFERENCES `foodcategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `preferfood` ADD CONSTRAINT `PreferFood_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `Review_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `Review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewalert` ADD CONSTRAINT `ReviewAlert_alert_id_fkey` FOREIGN KEY (`alert_id`) REFERENCES `alert`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewalert` ADD CONSTRAINT `ReviewAlert_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewinquiry` ADD CONSTRAINT `ReviewInquiry_inquiry_id_fkey` FOREIGN KEY (`inquiry_id`) REFERENCES `inquiry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewinquiry` ADD CONSTRAINT `ReviewInquiry_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `store` ADD CONSTRAINT `Store_food_category_id_fkey` FOREIGN KEY (`food_category_id`) REFERENCES `foodcategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `store` ADD CONSTRAINT `Store_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `storepicture` ADD CONSTRAINT `StorePicture_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `term` ADD CONSTRAINT `Term_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `useralert` ADD CONSTRAINT `UserAlert_alert_id_fkey` FOREIGN KEY (`alert_id`) REFERENCES `alert`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `useralert` ADD CONSTRAINT `UserAlert_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userinfo` ADD CONSTRAINT `UserInfo_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usermission` ADD CONSTRAINT `UserMission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usermission` ADD CONSTRAINT `UserMission_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userreview` ADD CONSTRAINT `UserReview_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userreview` ADD CONSTRAINT `UserReview_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userterm` ADD CONSTRAINT `UserTerm_term_id_fkey` FOREIGN KEY (`term_id`) REFERENCES `term`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userterm` ADD CONSTRAINT `UserTerm_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usertoken` ADD CONSTRAINT `UserToken_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
