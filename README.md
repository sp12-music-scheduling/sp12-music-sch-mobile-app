# Studio Buddy
## About
Studio Buddy is cross-platform mobile application built using React Native, JavaScript, and Firestore. It is an application proposed by a trumpet professor at Kennesaw State University to help manage his trumpet courses.
## How to Run Project
### Android
Visit the following [<u>link</u>](https://reactnative.dev/docs/environment-setup) to setup your machine to run React Native projects. Choose to follow the instructions for React Native CLI Quickstart.
![](https://i.imgur.com/X9SRAi5.png)

1. Download project to location of choice on computer.
2. Open powershell.
3. Navigate to the directory where project is located.
4. Run the command: npx react-native start.
5. Once Metro successfully started, (you should see the Metro logo) open a new powershell window. <br/>

![](https://i.imgur.com/1Wi34kh.png)

6. On the new powershell window, navigate to the directory where project is located.
7. Run the command: npx react-native run-android.

### IOS
1. Download project to location of choice on computer.
2. Open terminal.
3. Navigate to the directory where project is located.
4. Run the command: npx react-native run-ios --simulator="iPhone 14" (can choose simulator of choice).

## Project Structure
In this project, the code created by the team are located in the src and the legacy_files directory. The remaining folders are the automatic files created when we created a React Native project.

The legacy_files directory contains old code and assets no longer used in the app.

The following bullet list is an overview of the directories within the src directory. Bolded indicates directory.
* **src**
    * **assets**: Includes images and icons.
        * **icons**: Includes icons used in the app.
    * **components**: Includes components such as buttons and styles used repetitively in the app.
        * **form**: Generic structure for forms.
        * **login**: Contains the styling used for the login.
            * **CustomButton**: Styling for buttons.
            * **CustomInput**: Styling for the input boxes.
        * **teacher**: Includes components such as for rows for practice plan and exercises.
    * **navigation**: Includes navigation for application.
        * **core**: All the navigation is located here. The primary navigation uses stack. The drawer navigation is used as the menu. The tab navigation is used for the bottom navigation throughout the app.
    * **pages**: Includes the screens displayed in the app.
        * **login**: Includes the screens for the logins.
            * **ConfirmEmailScreen**: Includes the code for the confirmation email screen.
            * **ForgotPasswordScreen**: Includes the code for the forgot password screen.
            * **HomePage**: Includes the code for the homepage screen.
            * **ResetPasswordScreen**: Includes the code for the reset password screen.
            * **SignInScreen**: Includes the code for the signing in screen.
            * **SignUpScreen**: Includes the code for the registering as a new user  screen.
        * **shared**: Includes settings.
        * **student**: Includes screens for the student view.
            * **exercise**: Includes screens for viewing exercises.
            * **practice_plan**: Includes screens for practice plans.
            * **progress**:  Includes screens for seeing student progress throughout practice plans.
            * **video**: Includes screens for managing student video submissions.
        * **teacher**: Includes screens for the teacher view.
            * **exercise**: Includes screens for creating and managing exercises.
            * **practice_plan**: Includes screens for practice plans.
            * **practice_type**: Includes screens for creating and managing practice types.
            * **student_management**: Includes screens for managing student enrollment.
            * **video**: Includes screens for managing student video submissions.
