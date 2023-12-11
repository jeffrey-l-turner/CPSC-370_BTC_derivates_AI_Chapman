# Dating App Database Schema

## Users Table

- `id`: An auto-incrementing integer that serves as the primary key.
- `username`: A unique string that represents the user's username.
- `email`: A unique string that represents the user's email.
- `password_hash`: A string that represents the hashed version of the user's password.
- `created_at`: A timestamp that gets automatically set to the current time when a user is created.
- `updated_at`: A timestamp that gets automatically updated to the current time whenever the user's data is updated.

## Profiles Table

- `user_id`: An integer that serves as the primary key and references the `id` in the `users` table.
- `first_name`: A string that represents the user's first name.
- `last_name`: A string that represents the user's last name.
- `date_of_birth`: A date that represents the user's date of birth.
- `gender`: An enum that represents the user's gender. Can be 'male', 'female', or 'other'.
- `interested_in`: An enum that represents the genders the user is interested in. Can be 'male', 'female', 'both', or 'none'.
- `bio`: A text field that represents the user's biography.
- `city`: A string that represents the user's city.
- `wallet`: A string that represents the user's wallet.
- `country`: A string that represents the user's country.
- `karma`: An integer that represents the user's reputation points.

## Photos Table

- `id`: An auto-incrementing integer that serves as the primary key.
- `user_id`: An integer that references the `id` in the `users` table.
- `photo`: A BLOB that represents the photo.
- `created_at`: A timestamp that gets automatically set to the current time when a photo is uploaded.

## Messages Table

- `id`: An auto-incrementing integer that serves as the primary key.
- `sender_id`: An integer that references the `id` in the `users` table and represents the sender of the message.
- `receiver_id`: An integer that references the `id` in the `users` table and represents the receiver of the message.
- `message`: A text field that contains the message.
- `sent_at`: A timestamp that gets automatically set to the current time when a message is sent.

## Likes Table

- `user_id`: An integer that references the `id` in the `users` table and represents the user who liked another user.
- `liked_user_id`: An integer that references the `id` in the `users` table and represents the user who was liked.
- `created_at`: A timestamp that gets automatically set to the current time when a like is created.
