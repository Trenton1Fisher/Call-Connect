
<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/102687844/377417209-a5b9b639-3512-447f-ac2a-ee632e677424.PNG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20241017%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241017T100859Z&X-Amz-Expires=300&X-Amz-Signature=fbf601f30df2dfc22052bfa8481c560db20f57febdd19810c6ed57296c8ebde5&X-Amz-SignedHeaders=host" alt="Description of the image" />

<h3 align="center">Call Connect</h3>

  <p align="center">
    A platform where users can post problem tickets and connect with others via private message rooms to collaborate and solve issues in real-time.
    <br />
    <a href="https://job.trentonfisher.xyz" target="_blank">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Call-Connect is a full-stack web application designed to facilitate real-time problem-solving by connecting users who need assistance with others who are willing to help. Logged-in users can create detailed problem tickets describing their issues, and other users can join in to collaborate and offer solutions in private chat rooms. Whether it's troubleshooting technical problems, seeking advice, or providing expertise, Call-Connect enables seamless, real-time communication between users.

The platform is built with modern web technologies and integrates Socket.IO for real-time messaging, allowing users to engage in dynamic conversations without delays. Additionally, users can choose between free and premium account options, each offering tailored features and support based on their needs. This premium model helps sustain the platform while offering added benefits to power users.

Key Features:
- User Account Creation and Authentication: Powered by Clerk for secure and streamlined user authentication.
- Real-Time Collaboration: Instant messaging within private rooms using Socket.IO, enabling efficient problem-solving.
- Problem Tickets: Logged-in users can create, manage, and join problem tickets that describe their issues in detail.
- Private Messaging Rooms: Each ticket is assigned a private room where users can collaborate in real time to resolve the issue.
- Premium and Free Accounts:
  Free accounts allow users to create and join a limited number of problem tickets.
  Premium accounts offer enhanced features such as unlimited ticket creation, priority support, and access to exclusive problem-solving tools.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

- ⚡️ React
- 🐘 SQLite
- ✨ TypeScript
- 💨 Socket.io

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Please follow the steps below to obtain the required API keys and set up the project with all dependencies. 
Ensure that you do not push sensitive information (like API keys) back into the repository.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Trenton1Fisher/Call-Connect
   ```
2. Install NPM packages in both client and server direcories
   ```sh
   npm install
   ```
3. Obtain required API Keys
  - Clerk Authentication Key: Sign up at https://clerk.com, navigate to the Developer tab, and generate your Clerk API Key.
  - Stripe API Key: Sign up at https://stripe.com, go to the Developer tab, and generate your Stripe API Key.
    
5. Enter your Client Side API keys in a `.env.local` in the client directory
   ```js
   VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   ```
6. Enter your Server Side API keys in a `.env` in the server directory 
   ```js
   STRIPE_SECRET_KEY=your-stripe-secret-key
   ```
   
7. Install SQLite
- If SQLite is not installed on your system, download it from https://www.sqlite.org/download.html and follow the installation instructions for your platform.
  
9. Set Up SQLite Database
   - Create a directory to hold your SQLite database, for example database/
     ```
     mkdir database
     ```
    - Use the schema provided in lib/database/schema.sql to initialize database structure
      ```
      sqlite3 database/database.db < lib/database/schema.sql
      ```
    - Update the path to your SQLite Database in the server direcory, Open src/utils/dbUtils.ts and update the database path to match the location of your SQLite Database
      ```
      const databaseConnection = new sqlite3.Database(
        'Your Database path relative to this file location',
         err => {
        if (err) {
          console.error('Error connecting to the database:', err.message)
        } else {
          console.log('Connected to the mydatabase.db SQLite database.')
        }
        }
      )
      ```
      
10. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## More ScreenShots

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Trenton Fisher
trenton0fisher@gmail.com

Project Link: [https://github.com/github_username/repo_name](https://github.com/Trenton1Fisher/Call-Connect)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
