/* =========================================
   SMARTLEARN AI
   MAIN JAVASCRIPT
   ========================================= */


/* =========================================
   PAGE LOAD
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    setupLogin();
    setupEducationSelection();
    setupAcademicSelection();
    setupDashboard();
    setupQuizPage();
    setupAnalyticsPage();
    setupSkillGapPage();
    setupLearningDNA();

});


/* =========================================
   LOGIN
   ========================================= */

function setupLogin() {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }


    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email =
                document.getElementById("email").value.trim();

            const password =
                document.getElementById("password").value.trim();

            const errorMessage =
                document.getElementById("loginError");


            const demoEmail =
                "student@smartlearn.ai";

            const demoPassword =
                "123456";


            if (
                email === demoEmail &&
                password === demoPassword
            ) {

                if (errorMessage) {
                    errorMessage.textContent = "";
                }

                localStorage.setItem(
                    "smartlearnLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "smartlearnUserEmail",
                    email
                );

                window.location.href =
                    "education-selection.html";

            } else {

                if (errorMessage) {
                    errorMessage.textContent =
                        "Invalid email or password. Use the demo account.";
                }

            }

        }
    );

}


/* =========================================
   DEMO LOGIN
   ========================================= */

function demoLogin() {

    localStorage.setItem(
        "smartlearnLoggedIn",
        "true"
    );

    localStorage.setItem(
        "smartlearnUserEmail",
        "student@smartlearn.ai"
    );

    window.location.href =
        "education-selection.html";
}


/* =========================================
   EDUCATION SELECTION
   ========================================= */

function setupEducationSelection() {

    const cards =
        document.querySelectorAll(".education-card");

    const continueButton =
        document.getElementById("continueEducationBtn");

    const message =
        document.getElementById("educationMessage");


    if (
        cards.length === 0 ||
        !continueButton
    ) {
        return;
    }


    let selectedEducation = null;


    cards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                cards.forEach(function (item) {

                    item.classList.remove(
                        "selected"
                    );

                });


                card.classList.add(
                    "selected"
                );


                selectedEducation =
                    card.dataset.education;


                const title =
                    card.querySelector("h2");

                if (message && title) {

                    message.textContent =
                        title.textContent +
                        " selected ✓";

                    message.classList.add(
                        "selected-message"
                    );

                }


                continueButton.disabled =
                    false;

            }
        );

    });


    continueButton.addEventListener(
        "click",
        function () {

            if (!selectedEducation) {
                return;
            }


            localStorage.setItem(
                "educationLevel",
                selectedEducation
            );


            window.location.href =
                "class-selection.html";

        }
    );

}


/* =========================================
   ACADEMIC SELECTION
   ========================================= */

function setupAcademicSelection() {

    const content =
        document.getElementById("selectionContent");

    const continueButton =
        document.getElementById(
            "continueSelectionBtn"
        );

    const message =
        document.getElementById(
            "selectionMessage"
        );


    if (
        !content ||
        !continueButton
    ) {
        return;
    }


    const education =
        localStorage.getItem(
            "educationLevel"
        );


    let selectedData = {};


    /* =====================================
       SCHOOL
       ===================================== */

    if (education === "school") {

        createSchoolOptions(
            content,
            selectedData,
            message,
            continueButton
        );

    }


    /* =====================================
       JUNIOR COLLEGE
       ===================================== */

    else if (
        education === "junior-college"
    ) {

        createJuniorCollegeOptions(
            content,
            selectedData,
            message,
            continueButton
        );

    }


    /* =====================================
       UG
       ===================================== */

    else if (education === "ug") {

        createUGOptions(
            content,
            selectedData,
            message,
            continueButton
        );

    }


    /* =====================================
       PG
       ===================================== */

    else if (education === "pg") {

        createPGOptions(
            content,
            selectedData,
            message,
            continueButton
        );

    }


    /* =====================================
       CONTINUE
       ===================================== */

    continueButton.addEventListener(
        "click",
        function () {

            if (!selectedData.primary) {
                return;
            }


            localStorage.setItem(
                "academicData",
                JSON.stringify(selectedData)
            );


            window.location.href =
                "dashboard.html";

        }
    );

}


/* =========================================
   SCHOOL OPTIONS
   ========================================= */

function createSchoolOptions(
    content,
    data,
    message,
    continueButton
) {

    const title =
        document.getElementById(
            "selectionTitle"
        );

    const description =
        document.getElementById(
            "selectionDescription"
        );


    if (title) {
        title.textContent =
            "Which Class Are You In? 📚";
    }


    if (description) {
        description.textContent =
            "Choose your class to personalize subjects, quizzes and learning activities.";
    }


    const section =
        document.createElement("div");

    section.className =
        "option-section";


    section.innerHTML = `

        <h2>Select Your Class</h2>

        <div
            class="option-grid"
            id="schoolOptions">
        </div>

    `;


    content.appendChild(section);


    const grid =
        document.getElementById(
            "schoolOptions"
        );


    /* CLASS 1 - 12 */

    for (
        let i = 1;
        i <= 12;
        i++
    ) {

        const card =
            document.createElement("button");

        card.type = "button";

        card.className =
            "option-card";


        card.innerHTML = `

            <div class="option-icon">
                📖
            </div>

            <h3>
                Class ${i}
            </h3>

            <p>
                Personalized learning
            </p>

        `;


        card.addEventListener(
            "click",
            function () {

                selectOption(
                    grid,
                    card,
                    message,
                    `Class ${i} selected ✓`,
                    function () {

                        data.primary =
                            `Class ${i}`;

                        data.class =
                            `Class ${i}`;

                    },
                    continueButton
                );

            }
        );


        grid.appendChild(card);

    }

}


/* =========================================
   JUNIOR COLLEGE
   ========================================= */

function createJuniorCollegeOptions(
    content,
    data,
    message,
    continueButton
) {

    const title =
        document.getElementById(
            "selectionTitle"
        );

    const description =
        document.getElementById(
            "selectionDescription"
        );


    if (title) {
        title.textContent =
            "Choose Your Class & Stream 🎓";
    }


    if (description) {
        description.textContent =
            "Select your year and stream for personalized board and entrance exam preparation.";
    }


    const section =
        document.createElement("div");

    section.className =
        "option-section";


    section.innerHTML = `

        <h2>Select Year</h2>

        <div class="option-grid stream-grid">

            <button
                type="button"
                class="option-card year-option"
                data-year="11th">

                <div class="option-icon">
                    📘
                </div>

                <h3>
                    11th Class
                </h3>

                <p>
                    First year
                </p>

            </button>


            <button
                type="button"
                class="option-card year-option"
                data-year="12th">

                <div class="option-icon">
                    📕
                </div>

                <h3>
                    12th Class
                </h3>

                <p>
                    Second year
                </p>

            </button>

        </div>


        <div
            id="streamArea"
            style="margin-top:30px;">
        </div>

    `;


    content.appendChild(section);


    const yearOptions =
        section.querySelectorAll(
            ".year-option"
        );

    const streamArea =
        section.querySelector(
            "#streamArea"
        );


    yearOptions.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    yearOptions.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );

                        }
                    );


                    card.classList.add(
                        "selected"
                    );


                    data.year =
                        card.dataset.year;

                    data.primary =
                        card.dataset.year;


                    continueButton.disabled =
                        true;


                    streamArea.innerHTML = `

                        <div class="option-section">

                            <h2>
                                Select Stream
                            </h2>

                            <div class="option-grid stream-grid">


                                <button
                                    type="button"
                                    class="option-card stream-option"
                                    data-stream="MPC">

                                    <div class="option-icon">
                                        🔢
                                    </div>

                                    <h3>
                                        MPC
                                    </h3>

                                    <p>
                                        Maths • Physics • Chemistry
                                    </p>

                                </button>


                                <button
                                    type="button"
                                    class="option-card stream-option"
                                    data-stream="BiPC">

                                    <div class="option-icon">
                                        🧬
                                    </div>

                                    <h3>
                                        BiPC
                                    </h3>

                                    <p>
                                        Biology • Physics • Chemistry
                                    </p>

                                </button>


                                <button
                                    type="button"
                                    class="option-card stream-option"
                                    data-stream="MEC">

                                    <div class="option-icon">
                                        💼
                                    </div>

                                    <h3>
                                        MEC
                                    </h3>

                                    <p>
                                        Maths • Economics • Commerce
                                    </p>

                                </button>


                                <button
                                    type="button"
                                    class="option-card stream-option"
                                    data-stream="CEC">

                                    <div class="option-icon">
                                        📊
                                    </div>

                                    <h3>
                                        CEC
                                    </h3>

                                    <p>
                                        Civics • Economics • Commerce
                                    </p>

                                </button>


                                <button
                                    type="button"
                                    class="option-card stream-option"
                                    data-stream="Other">

                                    <div class="option-icon">
                                        📚
                                    </div>

                                    <h3>
                                        Other
                                    </h3>

                                    <p>
                                        Other stream
                                    </p>

                                </button>


                            </div>

                        </div>

                    `;


                    const streamOptions =
                        streamArea.querySelectorAll(
                            ".stream-option"
                        );


                    streamOptions.forEach(
                        function (streamCard) {

                            streamCard.addEventListener(
                                "click",
                                function () {

                                    streamOptions.forEach(
                                        function (item) {

                                            item.classList.remove(
                                                "selected"
                                            );

                                        }
                                    );


                                    streamCard.classList.add(
                                        "selected"
                                    );


                                    data.stream =
                                        streamCard.dataset.stream;


                                    data.primary =
                                        data.year +
                                        " - " +
                                        data.stream;


                                    if (message) {

                                        message.textContent =
                                            data.primary +
                                            " selected ✓";

                                        message.classList.add(
                                            "selected-message"
                                        );

                                    }


                                    continueButton.disabled =
                                        false;

                                }
                            );

                        }
                    );

                }
            );

        }
    );

}


/* =========================================
   UG OPTIONS
   ========================================= */

function createUGOptions(
    content,
    data,
    message,
    continueButton
) {

    const title =
        document.getElementById(
            "selectionTitle"
        );

    const description =
        document.getElementById(
            "selectionDescription"
        );


    if (title) {
        title.textContent =
            "Choose Your UG Course 🎓";
    }


    if (description) {
        description.textContent =
            "Select your degree and academic year to personalize your college learning journey.";
    }


    const section =
        document.createElement("div");

    section.className =
        "option-section";


    section.innerHTML = `

        <h2>
            Select Course
        </h2>


        <div class="option-grid">


            <button
                type="button"
                class="option-card ug-option"
                data-course="B.Tech">

                <div class="option-icon">
                    💻
                </div>

                <h3>
                    B.Tech
                </h3>

                <p>
                    Engineering
                </p>

            </button>


            <button
                type="button"
                class="option-card ug-option"
                data-course="B.Com">

                <div class="option-icon">
                    💰
                </div>

                <h3>
                    B.Com
                </h3>

                <p>
                    Commerce
                </p>

            </button>


            <button
                type="button"
                class="option-card ug-option"
                data-course="B.Sc">

                <div class="option-icon">
                    🔬
                </div>

                <h3>
                    B.Sc
                </h3>

                <p>
                    Science
                </p>

            </button>


            <button
                type="button"
                class="option-card ug-option"
                data-course="BBA">

                <div class="option-icon">
                    📈
                </div>

                <h3>
                    BBA
                </h3>

                <p>
                    Business Administration
                </p>

            </button>


        </div>


        <div
            id="ugDetails"
            style="margin-top:30px;">
        </div>

    `;


    content.appendChild(section);


    const options =
        section.querySelectorAll(
            ".ug-option"
        );

    const details =
        section.querySelector(
            "#ugDetails"
        );


    options.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    options.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );

                        }
                    );


                    card.classList.add(
                        "selected"
                    );


                    data.course =
                        card.dataset.course;


                    data.primary =
                        data.course;


                    details.innerHTML = `

                        <div class="option-section">

                            <h2>
                                Select Year
                            </h2>


                            <div class="option-grid">


                                <button
                                    type="button"
                                    class="option-card year-option">

                                    <div class="option-icon">
                                        1️⃣
                                    </div>

                                    <h3>
                                        1st Year
                                    </h3>

                                    <p>
                                        Foundation learning
                                    </p>

                                </button>


                                <button
                                    type="button"
                                    class="option-card year-option">

                                    <div class="option-icon">
                                        2️⃣
                                    </div>

                                    <h3>
                                        2nd Year
                                    </h3>

                                    <p>
                                        Core subjects
                                    </p>

                                </button>


                                <button
                                    type="button"
                                    class="option-card year-option">

                                    <div class="option-icon">
                                        3️⃣
                                    </div>

                                    <h3>
                                        3rd Year
                                    </h3>

                                    <p>
                                        Advanced learning
                                    </p>

                                </button>


                                <button
                                    type="button"
                                    class="option-card year-option">

                                    <div class="option-icon">
                                        4️⃣
                                    </div>

                                    <h3>
                                        4th Year
                                    </h3>

                                    <p>
                                        Projects & career
                                    </p>

                                </button>


                            </div>

                        </div>

                    `;


                    const years =
                        details.querySelectorAll(
                            ".year-option"
                        );


                    years.forEach(
                        function (yearCard) {

                            yearCard.addEventListener(
                                "click",
                                function () {

                                    years.forEach(
                                        function (item) {

                                            item.classList.remove(
                                                "selected"
                                            );

                                        }
                                    );


                                    yearCard.classList.add(
                                        "selected"
                                    );


                                    data.year =
                                        yearCard
                                            .querySelector("h3")
                                            .textContent;


                                    data.primary =
                                        data.course +
                                        " - " +
                                        data.year;


                                    if (message) {

                                        message.textContent =
                                            data.primary +
                                            " selected ✓";

                                        message.classList.add(
                                            "selected-message"
                                        );

                                    }


                                    continueButton.disabled =
                                        false;

                                }
                            );

                        }
                    );

                }
            );

        }
    );

}


/* =========================================
   PG OPTIONS
   ========================================= */

function createPGOptions(
    content,
    data,
    message,
    continueButton
) {

    const title =
        document.getElementById(
            "selectionTitle"
        );

    const description =
        document.getElementById(
            "selectionDescription"
        );


    if (title) {
        title.textContent =
            "Choose Your PG Course 🎓";
    }


    if (description) {
        description.textContent =
            "Select your postgraduate course and academic year.";
    }


    const section =
        document.createElement("div");

    section.className =
        "option-section";


    section.innerHTML = `

        <h2>
            Select Course
        </h2>


        <div class="option-grid">


            <button
                type="button"
                class="option-card pg-option"
                data-course="M.Tech">

                <div class="option-icon">
                    💻
                </div>

                <h3>
                    M.Tech
                </h3>

                <p>
                    Technology & Engineering
                </p>

            </button>


            <button
                type="button"
                class="option-card pg-option"
                data-course="M.Sc">

                <div class="option-icon">
                    🔬
                </div>

                <h3>
                    M.Sc
                </h3>

                <p>
                    Science
                </p>

            </button>


            <button
                type="button"
                class="option-card pg-option"
                data-course="MBA">

                <div class="option-icon">
                    📈
                </div>

                <h3>
                    MBA
                </h3>

                <p>
                    Business Management
                </p>

            </button>


            <button
                type="button"
                class="option-card pg-option"
                data-course="MCA">

                <div class="option-icon">
                    🖥️
                </div>

                <h3>
                    MCA
                </h3>

                <p>
                    Computer Applications
                </p>

            </button>


        </div>


        <div
            id="pgDetails"
            style="margin-top:30px;">
        </div>

    `;


    content.appendChild(section);


    const options =
        section.querySelectorAll(
            ".pg-option"
        );

    const details =
        section.querySelector(
            "#pgDetails"
        );


    options.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    options.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );

                        }
                    );


                    card.classList.add(
                        "selected"
                    );


                    data.course =
                        card.dataset.course;


                    details.innerHTML = `

                        <div class="option-section">

                            <h2>
                                Select Year
                            </h2>


                            <div class="option-grid">


                                <button
                                    type="button"
                                    class="option-card year-option">

                                    <div class="option-icon">
                                        1️⃣
                                    </div>

                                    <h3>
                                        1st Year
                                    </h3>

                                    <p>
                                        Advanced foundation
                                    </p>

                                </button>


                                <button
                                    type="button"
                                    class="option-card year-option">

                                    <div class="option-icon">
                                        2️⃣
                                    </div>

                                    <h3>
                                        2nd Year
                                    </h3>

                                    <p>
                                        Specialization & projects
                                    </p>

                                </button>


                            </div>

                        </div>

                    `;


                    const years =
                        details.querySelectorAll(
                            ".year-option"
                        );


                    years.forEach(
                        function (yearCard) {

                            yearCard.addEventListener(
                                "click",
                                function () {

                                    years.forEach(
                                        function (item) {

                                            item.classList.remove(
                                                "selected"
                                            );

                                        }
                                    );


                                    yearCard.classList.add(
                                        "selected"
                                    );


                                    data.year =
                                        yearCard
                                            .querySelector("h3")
                                            .textContent;


                                    data.primary =
                                        data.course +
                                        " - " +
                                        data.year;


                                    if (message) {

                                        message.textContent =
                                            data.primary +
                                            " selected ✓";

                                        message.classList.add(
                                            "selected-message"
                                        );

                                    }


                                    continueButton.disabled =
                                        false;

                                }
                            );

                        }
                    );

                }
            );

        }
    );

}


/* =========================================
   COMMON OPTION SELECTOR
   ========================================= */

function selectOption(
    grid,
    card,
    message,
    text,
    callback,
    continueButton
) {

    grid.querySelectorAll(
        ".option-card"
    ).forEach(
        function (item) {

            item.classList.remove(
                "selected"
            );

        }
    );


    card.classList.add(
        "selected"
    );


    callback();


    if (message) {

        message.textContent =
            text;

        message.classList.add(
            "selected-message"
        );

    }


    continueButton.disabled =
        false;

}


/* =========================================
   DASHBOARD PERSONALIZATION
   ========================================= */

function setupDashboard() {

    const dashboardPage =
        document.querySelector(
            ".dashboard-page"
        );

    if (!dashboardPage) {
        return;
    }


    const education =
        localStorage.getItem(
            "educationLevel"
        );


    const academicData =
        localStorage.getItem(
            "academicData"
        );


    let data = {};


    if (academicData) {

        try {

            data =
                JSON.parse(
                    academicData
                );

        } catch (error) {

            data = {};

        }

    }


    const educationNames = {

        "school":
            "School",

        "junior-college":
            "Junior College",

        "ug":
            "Undergraduate",

        "pg":
            "Postgraduate"

    };


    const educationName =
        educationNames[education] ||
        "Student";


    let academicTitle =
        educationName;


    if (data.primary) {

        academicTitle =
            data.primary;

    }


    const titleElement =
        document.getElementById(
            "academicTitle"
        );


    if (titleElement) {

        titleElement.textContent =
            academicTitle;

    }


    const descriptionElement =
        document.getElementById(
            "academicDescription"
        );


    if (descriptionElement) {

        if (education === "school") {

            descriptionElement.textContent =
                "School learning • Personalized subjects • Adaptive practice";

        }

        else if (
            education === "junior-college"
        ) {

            descriptionElement.textContent =
                "Board preparation • Stream-based learning • Entrance exam preparation";

        }

        else if (
            education === "ug"
        ) {

            descriptionElement.textContent =
                "Degree learning • Semester subjects • Skills & career preparation";

        }

        else if (
            education === "pg"
        ) {

            descriptionElement.textContent =
                "Advanced learning • Specialization • Projects & career preparation";

        }

    }


    const profileText =
        document.getElementById(
            "studentProfileText"
        );


    if (profileText) {

        if (data.primary) {

            profileText.textContent =
                `Personalized learning journey for ${data.primary}.`;

        } else {

            profileText.textContent =
                "Let's continue your learning journey.";

        }

    }


    const nextAction =
        document.getElementById(
            "nextActionText"
        );


    if (nextAction) {

        nextAction.textContent =
            `Start a learning activity for ${academicTitle}. SmartLearn AI will use your performance to build your Learning DNA and recommend your next best action.`;

    }


    loadDashboardQuizData();

}


/* =========================================
   LOGOUT
   ========================================= */

function logoutUser() {

    localStorage.removeItem(
        "smartlearnLoggedIn"
    );

    localStorage.removeItem(
        "smartlearnUserEmail"
    );

    localStorage.removeItem(
        "educationLevel"
    );

    localStorage.removeItem(
        "academicData"
    );


    window.location.href =
        "index.html";

}


/* =========================================================
   ADAPTIVE QUIZ
   SINGLE CLEAN ENGINE
   ========================================================= */


/* =========================================
   QUESTION BANK
   ========================================= */

const adaptiveQuestionBank = {

    "C Programming": {

        "Variables": [

            {
                question:
                    "Which data type is commonly used to store an integer in C?",

                options:
                    ["int", "float", "char", "double"],

                answer:
                    "int",

                difficulty:
                    "Easy"
            },

            {
                question:
                    "Which symbol is used to assign a value to a variable in C?",

                options:
                    ["=", "==", "+=", "!="],

                answer:
                    "=",

                difficulty:
                    "Medium"
            },

            {
                question:
                    "Which statement correctly declares an integer variable named age?",

                options: [
                    "int age;",
                    "integer age;",
                    "age int;",
                    "var age;"
                ],

                answer:
                    "int age;",

                difficulty:
                    "Hard"
            }

        ],


        "Loops": [

            {
                question:
                    "Which loop is guaranteed to execute its body at least once?",

                options: [
                    "do-while",
                    "for",
                    "while",
                    "nested loop"
                ],

                answer:
                    "do-while",

                difficulty:
                    "Easy"
            },

            {
                question:
                    "Which keyword is used to immediately exit a loop?",

                options: [
                    "break",
                    "continue",
                    "exit",
                    "stop"
                ],

                answer:
                    "break",

                difficulty:
                    "Medium"
            },

            {
                question:
                    "How many times will for(i = 0; i < 5; i++) execute its body?",

                options: [
                    "5",
                    "4",
                    "6",
                    "Infinite"
                ],

                answer:
                    "5",

                difficulty:
                    "Hard"
            }

        ],


        "Arrays": [

            {
                question:
                    "What is the index of the first element of an array in C?",

                options:
                    ["0", "1", "-1", "Depends on the array"],

                answer:
                    "0",

                difficulty:
                    "Easy"
            },

            {
                question:
                    "Which declaration creates an integer array of 5 elements?",

                options: [
                    "int a[5];",
                    "array int a[5];",
                    "int[5] a;",
                    "a int[5];"
                ],

                answer:
                    "int a[5];",

                difficulty:
                    "Medium"
            },

            {
                question:
                    "If int a[5] is declared, what is the last valid index?",

                options:
                    ["4", "5", "3", "6"],

                answer:
                    "4",

                difficulty:
                    "Hard"
            }

        ],


        "Functions": [

            {
                question:
                    "Which keyword is used to return a value from a C function?",

                options:
                    ["return", "send", "output", "back"],

                answer:
                    "return",

                difficulty:
                    "Easy"
            },

            {
                question:
                    "Which part of a function specifies the type of value it returns?",

                options: [
                    "Return type",
                    "Parameter",
                    "Function body",
                    "Variable"
                ],

                answer:
                    "Return type",

                difficulty:
                    "Medium"
            },

            {
                question:
                    "A function that calls itself is known as what?",

                options: [
                    "Recursive function",
                    "Nested function",
                    "Loop function",
                    "Static function"
                ],

                answer:
                    "Recursive function",

                difficulty:
                    "Hard"
            }

        ],


        "Pointers": [

            {
                question:
                    "Which symbol is used to declare a pointer in C?",

                options:
                    ["*", "&", "#", "@"],

                answer:
                    "*",

                difficulty:
                    "Easy"
            },

            {
                question:
                    "Which operator is used to obtain the address of a variable?",

                options:
                    ["&", "*", "%", "@"],

                answer:
                    "&",

                difficulty:
                    "Medium"
            },

            {
                question:
                    "If p stores the address of x, which expression accesses the value stored in x through p?",

                options:
                    ["*p", "&p", "p&", "p*"],

                answer:
                    "*p",

                difficulty:
                    "Hard"
            }

        ],


        "Structures": [

            {
                question:
                    "Which keyword is used to define a structure in C?",

                options:
                    ["struct", "record", "class", "object"],

                answer:
                    "struct",

                difficulty:
                    "Easy"
            },

            {
                question:
                    "Which operator accesses a structure member using a structure variable?",

                options:
                    [".", "->", "::", "#"],

                answer:
                    ".",

                difficulty:
                    "Medium"
            },

            {
                question:
                    "Which operator is commonly used to access a structure member through a pointer?",

                options:
                    ["->", ".", "::", "&"],

                answer:
                    "->",

                difficulty:
                    "Hard"
            }

        ]

    },


    "Data Structures": {

        "Arrays": [

            {
                question:
                    "Which data structure stores elements in contiguous memory locations?",

                options:
                    ["Array", "Stack", "Graph", "Tree"],

                answer:
                    "Array",

                difficulty:
                    "Easy"
            },

            {
                question:
                    "What is the typical time complexity of accessing an array element by index?",

                options:
                    ["O(1)", "O(n)", "O(log n)", "O(n²)"],

                answer:
                    "O(1)",

                difficulty:
                    "Medium"
            }

        ],


        "Stack": [

            {
                question:
                    "Which principle does a stack follow?",

                options:
                    [
                        "LIFO",
                        "FIFO",
                        "Random access",
                        "Priority order"
                    ],

                answer:
                    "LIFO",

                difficulty:
                    "Easy"
            },

            {
                question:
                    "Which operation removes an element from a stack?",

                options:
                    [
                        "Pop",
                        "Push",
                        "Peek",
                        "Insert"
                    ],

                answer:
                    "Pop",

                difficulty:
                    "Medium"
            }

        ],


        "Queue": [

            {
                question:
                    "Which principle does a queue normally follow?",

                options:
                    [
                        "FIFO",
                        "LIFO",
                        "Random order",
                        "Priority only"
                    ],

                answer:
                    "FIFO",

                difficulty:
                    "Easy"
            },

            {
                question:
                    "Which operation adds an element to a queue?",

                options:
                    [
                        "Enqueue",
                        "Dequeue",
                        "Pop",
                        "Delete"
                    ],

                answer:
                    "Enqueue",

                difficulty:
                    "Medium"
            }

        ],


        "Linked List": [

            {
                question:
                    "A linked list is made up of what?",

                options:
                    [
                        "Nodes",
                        "Only arrays",
                        "Only stacks",
                        "Only functions"
                    ],

                answer:
                    "Nodes",

                difficulty:
                    "Easy"
            },

            {
                question:
                    "In a singly linked list, each node normally contains data and what?",

                options: [
                    "A pointer to the next node",
                    "Two arrays",
                    "A stack",
                    "A queue"
                ],

                answer:
                    "A pointer to the next node",

                difficulty:
                    "Medium"
            }

        ]

    },


    "Mathematics": {

        "Algebra": [

            {
                question:
                    "What is the value of x if x + 5 = 12?",

                options:
                    ["7", "6", "8", "5"],

                answer:
                    "7",

                difficulty:
                    "Easy"
            },

            {
                question:
                    "What is the value of 2x if x = 6?",

                options:
                    ["12", "8", "10", "14"],

                answer:
                    "12",

                difficulty:
                    "Medium"
            }

        ],


        "Geometry": [

            {
                question:
                    "How many degrees are there in a right angle?",

                options:
                    ["90°", "45°", "180°", "360°"],

                answer:
                    "90°",

                difficulty:
                    "Easy"
            },

            {
                question:
                    "What is the area of a rectangle with length 5 and width 4?",

                options:
                    ["20", "9", "16", "25"],

                answer:
                    "20",

                difficulty:
                    "Medium"
            }

        ]

    }

};

/* =========================================================
   QUIZ STATE + ADAPTIVE QUIZ ENGINE
   ========================================================= */

let quizQuestions = [];
let currentQuestionIndex = 0;
let quizScore = 0;
let selectedAnswer = null;
let currentQuizSubject = "";
let currentQuizTopic = "";
let currentDifficulty = "Easy";


/* =========================================================
   QUIZ PAGE SETUP
   ========================================================= */

function setupQuizPage() {

    const subjectInput =
        document.getElementById("quizSubject");

    const topicInput =
        document.getElementById("quizTopic");

    const startButton =
        document.getElementById("startQuizBtn");

    if (!subjectInput || !topicInput || !startButton) {
        return;
    }

    startButton.disabled = true;

    function checkQuizInputs() {

        const subject =
            subjectInput.value.trim();

        const topic =
            topicInput.value.trim();

        startButton.disabled =
            !(subject && topic);
    }

    subjectInput.addEventListener(
        "input",
        checkQuizInputs
    );

    topicInput.addEventListener(
        "input",
        checkQuizInputs
    );


    startButton.addEventListener(
        "click",
        function () {

            const subject =
                subjectInput.value.trim();

            const topic =
                topicInput.value.trim();

            if (!subject || !topic) {

                alert(
                    "Please enter both subject and topic."
                );

                return;
            }

            startAdaptiveQuiz(
                subject,
                topic
            );
        }
    );


    const nextButton =
        document.getElementById(
            "nextQuestionBtn"
        );

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                nextQuizQuestion();

            }
        );

        nextButton.disabled = true;
    }
}


/* =========================================================
   START ADAPTIVE QUIZ
   ========================================================= */

async function startAdaptiveQuiz(
    subject,
    topic
) {

    if (!subject || !topic) {

        alert(
            "Please enter both subject and topic."
        );

        return;
    }


    currentQuizSubject =
        subject;

    currentQuizTopic =
        topic;

    currentDifficulty =
        "Easy";

    quizScore = 0;

    currentQuestionIndex =
        0;

    selectedAnswer =
        null;

    quizQuestions =
        [];


    const startButton =
        document.getElementById(
            "startQuizBtn"
        );


    if (startButton) {

        startButton.disabled =
            true;

        startButton.textContent =
            "Generating Quiz... 🤖";
    }


    try {

        const response =
            await fetch(
                "http://127.0.0.1:5000/api/adaptive-quiz",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        subject:
                            subject,

                        topic:
                            topic,

                        difficulty:
                            "Easy",

                        question_count:
                            5

                    })
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.error ||
                "Failed to generate quiz."
            );
        }


        if (
            !Array.isArray(
                data.questions
            ) ||
            data.questions.length === 0
        ) {

            throw new Error(
                "No questions were generated."
            );
        }


        quizQuestions =
            data.questions;


        const setup =
            document.getElementById(
                "quizSetup"
            );

        const quizArea =
            document.getElementById(
                "quizArea"
            );

        const quizResult =
            document.getElementById(
                "quizResult"
            );


        if (setup) {

            setup.style.display =
                "none";
        }


        if (quizResult) {

            quizResult.style.display =
                "none";
        }


        if (quizArea) {

            quizArea.style.display =
                "block";
        }


        const subjectName =
            document.getElementById(
                "quizSubjectName"
            );

        const topicName =
            document.getElementById(
                "quizTopicName"
            );


        if (subjectName) {

            subjectName.textContent =
                subject;
        }


        if (topicName) {

            topicName.textContent =
                topic;
        }


        showAdaptiveQuestion();

    }

    catch (error) {

        console.error(
            "Adaptive Quiz Error:",
            error
        );


        alert(
            "Unable to generate the quiz.\n\n" +
            error.message
        );

    }

    finally {

        if (startButton) {

            startButton.disabled =
                false;

            startButton.textContent =
                "Start Adaptive Quiz 🚀";
        }
    }
}


/* =========================================================
   SHOW QUESTION
   ========================================================= */

function showAdaptiveQuestion() {

    const question =
        quizQuestions[
            currentQuestionIndex
        ];


    if (!question) {

        finishAdaptiveQuiz();

        return;
    }


    selectedAnswer =
        null;


    currentDifficulty =
        question.difficulty ||
        "Easy";


    const questionNumber =
        document.getElementById(
            "questionNumber"
        );

    const difficultyBadge =
        document.getElementById(
            "difficultyBadge"
        );

    const difficultyLabel =
        document.getElementById(
            "difficultyLabel"
        );

    const questionText =
        document.getElementById(
            "questionText"
        );

    const optionsContainer =
        document.getElementById(
            "optionsContainer"
        );

    const progress =
        document.getElementById(
            "quizProgress"
        );

    const percentage =
        document.getElementById(
            "quizPercentage"
        );


    if (questionNumber) {

        questionNumber.textContent =
            `Question ${
                currentQuestionIndex + 1
            } of ${
                quizQuestions.length
            }`;
    }


    if (difficultyBadge) {

        difficultyBadge.textContent =
            currentDifficulty;
    }


    if (difficultyLabel) {

        difficultyLabel.textContent =
            `Difficulty: ${currentDifficulty}`;
    }


    if (questionText) {

        questionText.textContent =
            question.question ||
            question.text ||
            question.question_text ||
            "";
    }


    const progressValue =
        Math.round(
            (
                currentQuestionIndex /
                quizQuestions.length
            ) * 100
        );


    if (progress) {

        progress.style.width =
            `${progressValue}%`;
    }


    if (percentage) {

        percentage.textContent =
            `${progressValue}%`;
    }


    if (!optionsContainer) {
        return;
    }


    optionsContainer.innerHTML =
        "";


    const options =
        question.options ||
        question.choices ||
        [];


    options.forEach(
        function (
            option,
            index
        ) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";

            button.className =
                "quiz-option";


            let optionText =
                option;


            if (
                typeof option ===
                "object"
            ) {

                optionText =
                    option.text ||
                    option.label ||
                    option.value ||
                    "";
            }


            button.textContent =
                optionText;


            button.addEventListener(
                "click",
                function () {

                    selectAdaptiveAnswer(
                        optionText,
                        button
                    );

                }
            );


            optionsContainer.appendChild(
                button
            );

        }
    );


    const answerMessage =
        document.getElementById(
            "answerMessage"
        );


    if (answerMessage) {

        answerMessage.textContent =
            "";

        answerMessage.style.color =
            "";
    }


    const nextButton =
        document.getElementById(
            "nextQuestionBtn"
        );


    if (nextButton) {

        nextButton.disabled =
            true;
    }
}


/* =========================================================
   SELECT ANSWER
   ========================================================= */

function selectAdaptiveAnswer(
    answer,
    selectedButton
) {

    if (
        selectedAnswer !== null
    ) {

        return;
    }


    selectedAnswer =
        answer;


    const question =
        quizQuestions[
            currentQuestionIndex
        ];


    const buttons =
        document.querySelectorAll(
            ".quiz-option"
        );


    buttons.forEach(
        function (button) {

            button.disabled =
                true;

        }
    );


    selectedButton.classList.add(
        "selected"
    );


    const answerMessage =
        document.getElementById(
            "answerMessage"
        );


    const correctAnswer =
        question.correct_answer ||
        question.correctAnswer ||
        question.answer;


    if (
        normalizeAnswer(answer) ===
        normalizeAnswer(correctAnswer)
    ) {

        quizScore++;


        selectedButton.classList.add(
            "correct"
        );


        if (answerMessage) {

            answerMessage.textContent =
                "✓ Correct!";

            answerMessage.style.color =
                "#16a34a";
        }

    }

    else {

        selectedButton.classList.add(
            "incorrect"
        );


        buttons.forEach(
            function (button) {

                if (
                    normalizeAnswer(
                        button.textContent
                    ) ===
                    normalizeAnswer(
                        correctAnswer
                    )
                ) {

                    button.classList.add(
                        "correct"
                    );
                }

            }
        );


        if (answerMessage) {

            answerMessage.textContent =
                "Not quite. The correct answer is highlighted.";

            answerMessage.style.color =
                "#dc2626";
        }
    }


    const nextButton =
        document.getElementById(
            "nextQuestionBtn"
        );


    if (nextButton) {

        nextButton.disabled =
            false;
    }
}


/* =========================================================
   NORMALIZE ANSWER
   ========================================================= */

function normalizeAnswer(
    value
) {

    return String(
        value || ""
    )
        .trim()
        .replace(
            /^[A-Da-d][.)]\s*/,
            ""
        )
        .toLowerCase();
}


/* =========================================================
   NEXT QUESTION
   ========================================================= */

function nextQuizQuestion() {

    currentQuestionIndex++;


    if (
        currentQuestionIndex >=
        quizQuestions.length
    ) {

        finishAdaptiveQuiz();

        return;
    }


    showAdaptiveQuestion();
}


/* =========================================================
   FINISH QUIZ
   ========================================================= */

function finishAdaptiveQuiz() {

    const total =
        quizQuestions.length;


    const percentage =
        total > 0
            ? Math.round(
                (
                    quizScore /
                    total
                ) * 100
            )
            : 0;


    /* Save quiz evidence */

    localStorage.setItem(
        "lastQuizScore",
        percentage
    );

    localStorage.setItem(
        "lastQuizCorrect",
        quizScore
    );

    localStorage.setItem(
        "lastQuizTotal",
        total
    );

    localStorage.setItem(
        "lastQuizSubject",
        currentQuizSubject
    );

    localStorage.setItem(
        "lastQuizTopic",
        currentQuizTopic
    );

    localStorage.setItem(
        "lastQuizDifficulty",
        currentDifficulty
    );

    localStorage.setItem(
        "lastQuizTime",
        new Date().toISOString()
    );
    // =========================================================
// SEND QUIZ EVIDENCE TO SKILL GAP
// =========================================================

localStorage.setItem(
    "skillGapQuizEvidence",
    JSON.stringify({
        subject: currentQuizSubject,
        topic: currentQuizTopic,
        score: percentage,
        correct: quizScore,
        total: total,
        difficulty: currentDifficulty,
        timestamp: new Date().toISOString()
    })
);

    /* Topic performance */

    const topicPerformance = {

        subject:
            currentQuizSubject,

        topic:
            currentQuizTopic,

        score:
            percentage,

        correct:
            quizScore,

        total:
            total,

        difficulty:
            currentDifficulty,

        timestamp:
            new Date().toISOString()

    };


    localStorage.setItem(
        "lastTopicPerformance",
        JSON.stringify(
            topicPerformance
        )
    );

saveQuizToLearningDNAHistory();

    /* Show result */

    const quizArea =
        document.getElementById(
            "quizArea"
        );

    const quizResult =
        document.getElementById(
            "quizResult"
        );


    if (quizArea) {

        quizArea.style.display =
            "none";
    }


    if (quizResult) {

        quizResult.style.display =
            "block";
    }


    const finalScore =
        document.getElementById(
            "finalScore"
        );

    const quizScoreElement =
        document.getElementById(
            "quizScore"
        );

    const finalCorrect =
        document.getElementById(
            "finalCorrect"
        );

    const finalTotal =
        document.getElementById(
            "finalTotal"
        );

    const finalTopic =
        document.getElementById(
            "finalTopic"
        );

    const resultMessage =
        document.getElementById(
            "resultMessage"
        );


    if (finalScore) {

        finalScore.textContent =
            `${percentage}%`;
    }


    if (quizScoreElement) {

        quizScoreElement.textContent =
            `${percentage}%`;
    }


    if (finalCorrect) {

        finalCorrect.textContent =
            quizScore;
    }


    if (finalTotal) {

        finalTotal.textContent =
            total;
    }


    if (finalTopic) {

        finalTopic.textContent =
            currentQuizTopic;
    }


    if (resultMessage) {

        if (percentage < 40) {

            resultMessage.textContent =
                "Review the basics and practice this topic again.";

        }

        else if (percentage < 70) {

            resultMessage.textContent =
                "Your understanding is developing. Continue practicing.";

        }

        else if (percentage < 85) {

            resultMessage.textContent =
                "Good progress. Try more challenging questions.";

        }

        else {

            resultMessage.textContent =
                "Strong performance. You can move to advanced practice.";

        }
    }


    const quizResultText =
        document.getElementById(
            "quizResultText"
        );


    if (quizResultText) {

        quizResultText.textContent =
            `You answered ${quizScore} out of ${total} questions correctly.`;
    }
}
function restartAdaptiveQuiz() {

    // Hide result
    const quizResult = document.getElementById("quizResult");

    if (quizResult) {
        quizResult.style.display = "none";
    }

    // Show quiz setup
    const quizSetup = document.getElementById("quizSetup");

    if (quizSetup) {
        quizSetup.style.display = "block";
    }

    // Hide quiz area
    const quizArea = document.getElementById("quizArea");

    if (quizArea) {
        quizArea.style.display = "none";
    }

    // Restore previous subject and topic
    const subjectInput = document.getElementById("quizSubject");
    const topicInput = document.getElementById("quizTopic");

    if (subjectInput) {
        subjectInput.value = currentQuizSubject;
    }

    if (topicInput) {
        topicInput.value = currentQuizTopic;
    }

    // Reset quiz state
    quizQuestions = [];
    currentQuestionIndex = 0;
    quizScore = 0;
    selectedAnswer = null;
    currentDifficulty = "Easy";

    // Reset Next button
    const nextButton = document.getElementById("nextQuestionBtn");

    if (nextButton) {
        nextButton.disabled = true;
    }

    // Reset start button
    const startButton = document.getElementById("startQuizBtn");

    if (startButton) {
        startButton.disabled = false;
    }
}

/* =========================================
   DASHBOARD QUIZ DATA
   ========================================= */

function loadDashboardQuizData() {

    const score =
        localStorage.getItem(
            "lastQuizScore"
        );

    const correct =
        localStorage.getItem(
            "lastQuizCorrect"
        );

    const total =
        localStorage.getItem(
            "lastQuizTotal"
        );


    if (
        score === null
    ) {
        return;
    }


    /* Analytics cards */

    const analyticsCards =
        document.querySelectorAll(
            ".analytics-card"
        );


    if (
        analyticsCards.length >= 2
    ) {

        const quizCard =
            analyticsCards[1];


        const scoreElement =
            quizCard.querySelector(
                "h3"
            );


        const description =
            quizCard.querySelector(
                "p"
            );


        if (scoreElement) {

            scoreElement.textContent =
                `${score}%`;

        }


        if (
            description &&
            correct !== null &&
            total !== null
        ) {

            description.textContent =
                `${correct}/${total} correct`;

        }

    }


    /* Learning DNA */

    const dnaCards =
        document.querySelectorAll(
            ".dna-card"
        );


    if (
        dnaCards.length > 0
    ) {

        const knowledge =
            dnaCards[0];


        const progress =
            knowledge.querySelector(
                ".progress-fill"
            );


        const text =
            knowledge.querySelector(
                "span"
            );


        if (progress) {

            progress.style.width =
                `${score}%`;

        }


        if (text) {

            text.textContent =
                `Based on latest quiz: ${score}%`;

        }

    }


    /* Next Best Action */

    const nextAction =
        document.getElementById(
            "nextActionText"
        );


    if (nextAction) {

        if (
            Number(score) < 50
        ) {

            nextAction.textContent =
                "Review your weaker concepts and take another practice quiz to strengthen your foundation.";

        }

        else if (
            Number(score) < 80
        ) {

            nextAction.textContent =
                "Review the concepts you missed and continue with a medium-level adaptive quiz.";

        }

        else {

            nextAction.textContent =
                "Your current quiz performance is strong. Try a more challenging quiz to extend your understanding.";

        }

    }

}


/* =========================================
   SKILL GAP FINDER
   ========================================= */

function loadSkillGapAnalysis() {

    const subjectElement =
        document.getElementById(
            "skillSubject"
        );

    const topicElement =
        document.getElementById(
            "skillTopic"
        );

    const levelElement =
        document.getElementById(
            "skillLevel"
        );

    const explanationElement =
        document.getElementById(
            "skillExplanation"
        );

    const nextActionElement =
        document.getElementById(
            "skillNextAction"
        );

    const scoreElement =
        document.getElementById(
            "skillScore"
        );

    const difficultyElement =
        document.getElementById(
            "skillDifficulty"
        );

    const correctElement =
        document.getElementById(
            "skillCorrect"
        );

    const performanceContainer =
        document.getElementById(
            "topicPerformanceContainer"
        );


    /* Latest quiz evidence */

    const subject =
        localStorage.getItem(
            "lastQuizSubject"
        );

    const topic =
        localStorage.getItem(
            "lastQuizTopic"
        );

    const score =
        Number(
            localStorage.getItem(
                "lastQuizScore"
            )
        );

    const correct =
        Number(
            localStorage.getItem(
                "lastQuizCorrect"
            )
        );

    const total =
        Number(
            localStorage.getItem(
                "lastQuizTotal"
            )
        );

    const difficulty =
        localStorage.getItem(
            "lastQuizDifficulty"
        );


    /* =====================================
       NO EVIDENCE
       ===================================== */

    if (
        !subject ||
        !topic ||
        !total
    ) {

        if (subjectElement) {

            subjectElement.textContent =
                "Not Enough Data";

        }


        if (topicElement) {

            topicElement.textContent =
                "Complete a quiz to analyse skills";

        }


        if (levelElement) {

            levelElement.textContent =
                "Unknown";

        }


        if (explanationElement) {

            explanationElement.textContent =
                "Skill Gap analysis needs learning evidence such as quiz performance.";

        }


        if (nextActionElement) {

            nextActionElement.textContent =
                "Take an Adaptive Quiz to generate your first skill analysis.";

        }


        if (scoreElement) {

            scoreElement.textContent =
                "--";

        }


        if (correctElement) {

            correctElement.textContent =
                "--";

        }


        if (difficultyElement) {

            difficultyElement.textContent =
                "--";

        }


        if (performanceContainer) {

            performanceContainer.innerHTML = `

                <div class="empty-skill">

                    <div>
                        📊
                    </div>

                    <h3>
                        Skill map is being built
                    </h3>

                    <p>
                        Complete an Adaptive Quiz to generate your personalized topic performance.
                    </p>

                    <button
                        class="action-btn"
                        onclick="window.location.href='adaptive-quiz.html'">

                        Take Adaptive Quiz →

                    </button>

                </div>

            `;

        }


        return;

    }


    /* =====================================
       CALCULATE PERFORMANCE
       ===================================== */

    const percentage =
        Math.round(
            (
                correct /
                total
            ) * 100
        );


    let level =
        "";

    let explanation =
        "";

    let nextAction =
        "";


    /* =====================================
       SKILL LEVEL
       ===================================== */

    if (
        percentage < 40
    ) {

        level =
            "Needs Improvement";


        explanation =
            `Your performance in ${topic} is currently ${percentage}%. The system detected that this topic needs more foundational practice.`;


        nextAction =
            `Review the basics of ${topic} and take another adaptive quiz.`;

    }


    else if (
        percentage < 70
    ) {

        level =
            "Developing";


        explanation =
            `You have a developing understanding of ${topic}. Your current performance is ${percentage}%.`;


        nextAction =
            `Practice more questions on ${topic} and gradually increase difficulty.`;

    }


    else if (
        percentage < 85
    ) {

        level =
            "Proficient";


        explanation =
            `You have a good understanding of ${topic}. Your current performance is ${percentage}%.`;


        nextAction =
            `Try higher-difficulty questions to strengthen your understanding.`;

    }


    else {

        level =
            "Strong";


        explanation =
            `You demonstrated strong performance in ${topic} with ${percentage}%.`;


        nextAction =
            `Move to advanced questions or explore the next related topic.`;

    }


    /* =====================================
       UPDATE UI
       ===================================== */

    if (subjectElement) {

        subjectElement.textContent =
            subject;

    }


    if (topicElement) {

        topicElement.textContent =
            topic;

    }


    if (levelElement) {

        levelElement.textContent =
            level;

    }


    if (explanationElement) {

        explanationElement.textContent =
            explanation;

    }


    if (nextActionElement) {

        nextActionElement.textContent =
            nextAction;

    }


    if (scoreElement) {

        scoreElement.textContent =
            `${percentage}%`;

    }


    if (correctElement) {

        correctElement.textContent =
            `${correct}/${total}`;

    }


    if (difficultyElement) {

        difficultyElement.textContent =
            difficulty ||
            "Adaptive";

    }


    /* =====================================
       TOPIC PERFORMANCE
       ===================================== */

    if (
        performanceContainer
    ) {

        performanceContainer.innerHTML = `

            <div class="skill-performance-card">

                <div class="skill-performance-header">

                    <span>
                        ${topic}
                    </span>

                    <strong>
                        ${percentage}%
                    </strong>

                </div>


                <div class="skill-progress-bar">

                    <div
                        class="skill-progress-fill"
                        style="width:${percentage}%">
                    </div>

                </div>


                <p>
                    ${correct} correct out of ${total} questions
                </p>

            </div>

        `;

    }

}


/* =========================================
   SKILL GAP PAGE SETUP
   ========================================= */

function setupSkillGapPage() {

    const skillSubject =
        document.getElementById(
            "skillSubject"
        );

    const skillMap =
        document.getElementById(
            "topicPerformanceContainer"
        );


    if (
        !skillSubject &&
        !skillMap
    ) {

        return;

    }


    loadSkillGapAnalysis();

}


/* =========================================
   PERFORMANCE ANALYTICS
   ========================================= */

function loadPerformanceAnalytics() {

    const score =
        Number(
            localStorage.getItem(
                "lastQuizScore"
            )
        ) || 0;


    const correct =
        Number(
            localStorage.getItem(
                "lastQuizCorrect"
            )
        ) || 0;


    const total =
        Number(
            localStorage.getItem(
                "lastQuizTotal"
            )
        ) || 0;


    let accuracy =
        0;


    if (
        total > 0
    ) {

        accuracy =
            Math.round(
                (
                    correct /
                    total
                ) * 100
            );

    }


    let knowledge =
        score;


    /* Overview cards */

    const accuracyValue =
        document.getElementById(
            "accuracyValue"
        );

    const latestQuizValue =
        document.getElementById(
            "latestQuizValue"
        );

    const knowledgeValue =
        document.getElementById(
            "knowledgeValue"
        );

    const learningStatus =
        document.getElementById(
            "learningStatus"
        );


    if (accuracyValue) {

        accuracyValue.textContent =
            `${accuracy}%`;

    }


    if (latestQuizValue) {

        latestQuizValue.textContent =
            `${score}%`;

    }


    if (knowledgeValue) {

        knowledgeValue.textContent =
            `${knowledge}%`;

    }


    let status =
        "Starting";


    if (
        score >= 80
    ) {

        status =
            "Strong";

    }

    else if (
        score >= 60
    ) {

        status =
            "Developing";

    }

    else if (
        score > 0
    ) {

        status =
            "Needs Focus";

    }


    if (learningStatus) {

        learningStatus.textContent =
            status;

    }


    /* Progress bars */

    const knowledgeProgress =
        document.getElementById(
            "knowledgeProgress"
        );

    const accuracyProgress =
        document.getElementById(
            "accuracyProgress"
        );

    const knowledgePercent =
        document.getElementById(
            "knowledgePercent"
        );

    const accuracyPercent =
        document.getElementById(
            "accuracyPercent"
        );


    if (knowledgeProgress) {

        knowledgeProgress.style.width =
            `${knowledge}%`;

    }


    if (accuracyProgress) {

        accuracyProgress.style.width =
            `${accuracy}%`;

    }


    if (knowledgePercent) {

        knowledgePercent.textContent =
            `${knowledge}%`;

    }


    if (accuracyPercent) {

        accuracyPercent.textContent =
            `${accuracy}%`;

    }


    /* Quiz details */

    const correctAnswers =
        document.getElementById(
            "correctAnswers"
        );

    const totalQuestions =
        document.getElementById(
            "totalQuestions"
        );

    const quizScore =
        document.getElementById(
            "quizScore"
        );


    if (correctAnswers) {

        correctAnswers.textContent =
            correct;

    }


    if (totalQuestions) {

        totalQuestions.textContent =
            total;

    }


    if (quizScore) {

        quizScore.textContent =
            `${score}%`;

    }


    /* AI insight */

    const insightTitle =
        document.getElementById(
            "insightTitle"
        );

    const insightText =
        document.getElementById(
            "insightText"
        );


    if (
        score === 0 &&
        total === 0
    ) {

        if (insightTitle) {

            insightTitle.textContent =
                "Complete a quiz to generate insights";

        }


        if (insightText) {

            insightText.textContent =
                "Complete your first adaptive quiz. SmartLearn AI will analyze your performance and generate personalized learning insights.";

        }

    }


    else if (
        score >= 80
    ) {

        if (insightTitle) {

            insightTitle.textContent =
                "Strong learning performance 🎉";

        }


        if (insightText) {

            insightText.textContent =
                "Your recent quiz performance shows strong understanding. SmartLearn AI recommends moving towards more challenging questions.";

        }

    }


    else if (
        score >= 60
    ) {

        if (insightTitle) {

            insightTitle.textContent =
                "Good progress 👍";

        }


        if (insightText) {

            insightText.textContent =
                "You are developing your understanding. Review the concepts you missed and then practice with another adaptive quiz.";

        }

    }


    else {

        if (insightTitle) {

            insightTitle.textContent =
                "More practice recommended 📚";

        }


        if (insightText) {

            insightText.textContent =
                "Your recent result suggests that some concepts need more practice. SmartLearn AI recommends reviewing the basics before attempting harder questions.";

        }

    }


    /* Next Best Action */

    const nextActionTitle =
        document.getElementById(
            "nextActionTitle"
        );

    const nextActionText =
        document.getElementById(
            "nextActionText"
        );


    if (
        score === 0 &&
        total === 0
    ) {

        if (nextActionTitle) {

            nextActionTitle.textContent =
                "Take your first adaptive quiz";

        }


        if (nextActionText) {

            nextActionText.textContent =
                "Complete a quiz so SmartLearn AI can understand your current learning performance.";

        }

    }


    else if (
        score >= 80
    ) {

        if (nextActionTitle) {

            nextActionTitle.textContent =
                "Try a harder challenge 🚀";

        }


        if (nextActionText) {

            nextActionText.textContent =
                "Your current performance is strong. Practice with more challenging questions.";

        }

    }


    else if (
        score >= 60
    ) {

        if (nextActionTitle) {

            nextActionTitle.textContent =
                "Review missed concepts 🔄";

        }


        if (nextActionText) {

            nextActionText.textContent =
                "Review the questions you answered incorrectly and attempt another adaptive quiz.";

        }

    }


    else {

        if (nextActionTitle) {

            nextActionTitle.textContent =
                "Strengthen your foundation 📖";

        }


        if (nextActionText) {

            nextActionText.textContent =
                "Review basic concepts and practice easy questions before moving to higher difficulty.";

        }

    }

}


/* =========================================
   ANALYTICS PAGE SETUP
   ========================================= */

function setupAnalyticsPage() {

    const analyticsPage =
        document.getElementById(
            "analyticsPage"
        );


    const accuracyValue =
        document.getElementById(
            "accuracyValue"
        );


    const latestQuizValue =
        document.getElementById(
            "latestQuizValue"
        );


    if (
        analyticsPage ||
        accuracyValue ||
        latestQuizValue
    ) {

        loadPerformanceAnalytics();

    }

}


/* =========================================
   END
   ========================================= */
// =========================================================
// SMARTLEARN AI - RESOURCE FINDER
// =========================================================

function setupResourceFinder() {

    const subjectInput = document.getElementById("resourceSubject");
    const topicInput = document.getElementById("resourceTopic");
    const difficultyInput = document.getElementById("resourceDifficulty");
    const timeInput = document.getElementById("resourceTime");
    const typeInput = document.getElementById("resourceType");
    const findButton = document.getElementById("findResourcesBtn");

    if (
        !subjectInput ||
        !topicInput ||
        !difficultyInput ||
        !timeInput ||
        !typeInput ||
        !findButton
    ) {
        return;
    }

    findButton.addEventListener("click", async function () {

        const subject = subjectInput.value.trim();
        const topic = topicInput.value.trim();
        const difficulty = difficultyInput.value;
        const studyTime = timeInput.value;
        const resourceType = typeInput.value;

        if (!subject || !topic) {
            alert("Please enter both subject and topic.");
            return;
        }

        await findLearningResources(
            subject,
            topic,
            difficulty,
            studyTime,
            resourceType
        );

    });
}


// =========================================================
// FIND RESOURCES
// =========================================================

async function findLearningResources(
    subject,
    topic,
    difficulty,
    studyTime,
    resourceType
) {

    const loading = document.getElementById("resourceLoading");
    const results = document.getElementById("resourceResults");
    const resourceList = document.getElementById("resourceList");
    const summary = document.getElementById("resourceSummary");
    const findButton = document.getElementById("findResourcesBtn");

    if (loading) {
        loading.style.display = "block";
    }

    if (results) {
        results.style.display = "none";
    }

    if (findButton) {
        findButton.disabled = true;
        findButton.textContent = "Finding Resources...";
    }

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/resource-finder",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    subject: subject,
                    topic: topic,
                    difficulty: difficulty,
                    study_time: studyTime,
                    resource_type: resourceType

                })
            }
        );

        if (!response.ok) {
            throw new Error("Resource Finder request failed.");
        }

        const data = await response.json();

        console.log("Resource Finder Response:", data);

        displayLearningResources(data, subject, topic);

    } catch (error) {

        console.error("Resource Finder Error:", error);

        alert(
            "Unable to find resources right now. " +
            "Please make sure the SmartLearn AI backend is running."
        );

    } finally {

        if (loading) {
            loading.style.display = "none";
        }

        if (findButton) {
            findButton.disabled = false;
            findButton.textContent = "Find Resources 🔍";
        }

    }
}


// =========================================================
// DISPLAY RESOURCES
// =========================================================

function displayLearningResources(data, subject, topic) {

    const results = document.getElementById("resourceResults");
    const resourceList = document.getElementById("resourceList");
    const summary = document.getElementById("resourceSummary");

    if (!results || !resourceList) {
        return;
    }

    let resources = [];

    if (Array.isArray(data)) {

        resources = data;

    } else if (Array.isArray(data.resources)) {

        resources = data.resources;

    } else if (Array.isArray(data.recommendations)) {

        resources = data.recommendations;

    }

    resourceList.innerHTML = "";

    if (summary) {

        summary.textContent =
            `Personalized resources for ${subject} → ${topic}`;

    }

    if (resources.length === 0) {

        resourceList.innerHTML = `
            <div class="resource-card">
                <h3>No resources found</h3>
                <p>
                    Try another subject or topic.
                </p>
            </div>
        `;

        results.style.display = "block";
        return;
    }


    resources.forEach(function (resource) {

        const title =
            resource.title ||
            resource.name ||
            "Learning Resource";

        const description =
            resource.description ||
            resource.summary ||
            "Recommended learning resource.";

        const type =
            resource.type ||
            resource.resource_type ||
            "Resource";

        const reason =
            resource.reason ||
            resource.why ||
            resource.recommendation_reason ||
            "Recommended based on your learning requirements.";

        const url =
            resource.url ||
            resource.link ||
            resource.website ||
            "#";


        const card = document.createElement("div");

        card.className = "resource-card";

        card.innerHTML = `

            <div class="resource-type">
                ${escapeResourceHTML(type)}
            </div>

            <h3>
                ${escapeResourceHTML(title)}
            </h3>

            <p>
                ${escapeResourceHTML(description)}
            </p>

            <div class="resource-reason">
                <strong>Why this resource?</strong><br>
                ${escapeResourceHTML(reason)}
            </div>

            <a
                href="${escapeResourceURL(url)}"
                target="_blank"
                rel="noopener noreferrer"
                class="resource-link"
            >
                Open Resource →
            </a>

        `;

        resourceList.appendChild(card);

    });

    results.style.display = "block";
}


// =========================================================
// SECURITY HELPERS
// =========================================================

function escapeResourceHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function escapeResourceURL(value) {

    const url = String(value || "#").trim();

    if (
        url.startsWith("http://") ||
        url.startsWith("https://")
    ) {
        return url;
    }

    return "#";

}


// =========================================================
// INITIALIZE RESOURCE FINDER
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    setupResourceFinder();

});
// =========================================================
// SMARTLEARN AI - STUDY PLANNER
// =========================================================

function setupStudyPlanner() {

    const subjectsInput = document.getElementById("plannerSubjects");
    const goalInput = document.getElementById("plannerGoal");
    const deadlineInput = document.getElementById("plannerDeadline");
    const timeInput = document.getElementById("plannerTime");
    const priorityInput = document.getElementById("plannerPriority");
    const generateButton = document.getElementById("generatePlanBtn");

    if (
        !subjectsInput ||
        !goalInput ||
        !deadlineInput ||
        !timeInput ||
        !priorityInput ||
        !generateButton
    ) {
        return;
    }

    generateButton.addEventListener("click", async function () {

        const subjects = subjectsInput.value.trim();
        const goal = goalInput.value.trim();
        const deadline = deadlineInput.value;
        const availableTime = timeInput.value;
        const priority = priorityInput.value;

        if (!subjects) {
            alert("Please enter your subjects or topics.");
            return;
        }

        if (!goal) {
            alert("Please enter your study goal.");
            return;
        }

        if (!deadline) {
            alert("Please select your target date.");
            return;
        }

        await generateStudyPlan(
            subjects,
            goal,
            deadline,
            availableTime,
            priority
        );

    });
}


// =========================================================
// GENERATE STUDY PLAN
// =========================================================

async function generateStudyPlan(
    subjects,
    goal,
    deadline,
    availableTime,
    priority
) {

    const loading = document.getElementById("plannerLoading");
    const results = document.getElementById("plannerResults");
    const generateButton = document.getElementById("generatePlanBtn");

    if (loading) {
        loading.style.display = "block";
    }

    if (results) {
        results.style.display = "none";
    }

    if (generateButton) {
        generateButton.disabled = true;
        generateButton.textContent = "Creating Study Plan...";
    }

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/study-planner",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    subjects: subjects,
                    goal: goal,
                    deadline: deadline,
                    available_time: availableTime,
                    priority: priority

                })
            }
        );

        if (!response.ok) {
            throw new Error("Study Planner request failed.");
        }

        const data = await response.json();

        console.log("Study Planner Response:", data);

        displayStudyPlan(data, goal, deadline);

    } catch (error) {

        console.error("Study Planner Error:", error);

        alert(
            "Unable to generate the study plan right now. " +
            "Please make sure the SmartLearn AI backend is running."
        );

    } finally {

        if (loading) {
            loading.style.display = "none";
        }

        if (generateButton) {
            generateButton.disabled = false;
            generateButton.textContent = "Generate Study Plan 🚀";
        }

    }
}


// =========================================================
// DISPLAY STUDY PLAN
// =========================================================

function displayStudyPlan(data, goal, deadline) {

    const results = document.getElementById("plannerResults");
    const planList = document.getElementById("studyPlanList");
    const summary = document.getElementById("plannerSummary");
    const tipsContainer = document.getElementById("studyTips");

    if (!results || !planList) {
        return;
    }

    let plan = [];

    if (Array.isArray(data)) {

        plan = data;

    } else if (Array.isArray(data.plan)) {

        plan = data.plan;

    } else if (Array.isArray(data.study_plan)) {

        plan = data.study_plan;

    } else if (Array.isArray(data.schedule)) {

        plan = data.schedule;

    }

    planList.innerHTML = "";

    if (summary) {

        summary.textContent =
            `Goal: ${goal} | Target date: ${deadline}`;

    }


    if (plan.length === 0) {

        planList.innerHTML = `
            <div class="study-plan-card">

                <h3>No study plan generated</h3>

                <p>
                    Please try again with different subjects
                    or a different target date.
                </p>

            </div>
        `;

    } else {

        plan.forEach(function (day, index) {

            const date =
                day.date ||
                day.day ||
                `Day ${index + 1}`;

            const topic =
                day.topic ||
                day.subject ||
                day.task ||
                "Study Session";

            const duration =
                day.duration ||
                day.time ||
                day.study_time ||
                "Not specified";

            const activity =
                day.activity ||
                day.description ||
                day.focus ||
                "Focused learning session";

            const priority =
                day.priority ||
                "Medium";


            const card = document.createElement("div");

            card.className = "study-plan-card";

            card.innerHTML = `

                <h3>
                    ${escapePlannerHTML(date)}
                </h3>

                <p>
                    <strong>
                        ${escapePlannerHTML(topic)}
                    </strong>
                </p>

                <p>
                    ${escapePlannerHTML(activity)}
                </p>

                <div class="study-plan-meta">

                    <span class="study-plan-tag">
                        ⏱ ${escapePlannerHTML(duration)}
                    </span>

                    <span class="study-plan-tag">
                        🎯 ${escapePlannerHTML(priority)}
                    </span>

                </div>

            `;

            planList.appendChild(card);

        });

    }


    // Study tips

    let tips = [];

    if (Array.isArray(data.tips)) {
        tips = data.tips;
    }

    if (tipsContainer) {

        if (tips.length > 0) {

            tipsContainer.innerHTML = `

                <h3>💡 Study Tips</h3>

                <ul>
                    ${tips.map(function (tip) {

                        return `
                            <li>
                                ${escapePlannerHTML(tip)}
                            </li>
                        `;

                    }).join("")}
                </ul>

            `;

        } else {

            tipsContainer.innerHTML = `

                <h3>💡 Study Tips</h3>

                <ul>

                    <li>
                        Focus on one topic at a time.
                    </li>

                    <li>
                        Take short breaks between study sessions.
                    </li>

                    <li>
                        Practice what you learn.
                    </li>

                    <li>
                        Review difficult topics regularly.
                    </li>

                </ul>

            `;

        }

    }


    results.style.display = "block";
}


// =========================================================
// SECURITY HELPER
// =========================================================

function escapePlannerHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// =========================================================
// INITIALIZE STUDY PLANNER
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    setupStudyPlanner();

});
// =========================================================
// SMARTLEARN AI - RESUME BUILDER
// =========================================================

function setupResumeBuilder() {

    const buildButton = document.getElementById("buildResumeBtn");
    const printButton = document.getElementById("printResumeBtn");

    if (!buildButton) {
        return;
    }

    buildButton.addEventListener("click", async function () {

        const name = document.getElementById("resumeName").value.trim();
        const email = document.getElementById("resumeEmail").value.trim();
        const phone = document.getElementById("resumePhone").value.trim();
        const location = document.getElementById("resumeLocation").value.trim();

        const resumeType = document.getElementById("resumeType").value;

        const education =
            document.getElementById("resumeEducation").value.trim();

        const skills =
            document.getElementById("resumeSkills").value.trim();

        const projects =
            document.getElementById("resumeProjects").value.trim();

        const achievements =
            document.getElementById("resumeAchievements").value.trim();

        const github =
            document.getElementById("resumeGithub").value.trim();

        const linkedin =
            document.getElementById("resumeLinkedin").value.trim();

        const leetcode =
            document.getElementById("resumeLeetcode").value.trim();

        const codechef =
            document.getElementById("resumeCodechef").value.trim();


        if (!name) {
            alert("Please enter your full name.");
            return;
        }

        if (!email) {
            alert("Please enter your email.");
            return;
        }

        if (!education) {
            alert("Please enter your education details.");
            return;
        }

        if (!skills) {
            alert("Please enter your skills.");
            return;
        }


        await buildResume({

            name,
            email,
            phone,
            location,
            resumeType,
            education,
            skills,
            projects,
            achievements,
            github,
            linkedin,
            leetcode,
            codechef

        });

    });


    if (printButton) {

        printButton.addEventListener("click", function () {

            window.print();

        });

    }

}


// =========================================================
// BUILD RESUME
// =========================================================

async function buildResume(resumeData) {

    const loading =
        document.getElementById("resumeLoading");

    const result =
        document.getElementById("resumeResult");

    const buildButton =
        document.getElementById("buildResumeBtn");


    if (loading) {
        loading.style.display = "block";
    }

    if (result) {
        result.style.display = "none";
    }

    if (buildButton) {

        buildButton.disabled = true;

        buildButton.textContent =
            "Building Resume...";

    }


    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/resume-builder",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(resumeData)
            }
        );


        if (!response.ok) {

            throw new Error(
                "Resume Builder request failed."
            );

        }


        const data = await response.json();

        console.log(
            "Resume Builder Response:",
            data
        );


        if (!data.success) {

            throw new Error(
                data.error ||
                "Unable to build resume."
            );

        }


        displayResume(data.resume || data);


    } catch (error) {

        console.error(
            "Resume Builder Error:",
            error
        );

        alert(
            error.message ||
            "Unable to build your resume."
        );

    } finally {

        if (loading) {
            loading.style.display = "none";
        }

        if (buildButton) {

            buildButton.disabled = false;

            buildButton.textContent =
                "Build My Resume 🚀";

        }

    }

}


// =========================================================
// DISPLAY RESUME
// =========================================================

function displayResume(resume) {

    const result =
        document.getElementById("resumeResult");

    const preview =
        document.getElementById("resumePreview");


    if (!result || !preview) {
        return;
    }


    const name =
        resume.name ||
        resume.full_name ||
        "";

    const contact =
        resume.contact ||
        "";

    const summary =
        resume.summary ||
        resume.profile ||
        resume.objective ||
        "";

    const education =
        resume.education ||
        [];

    const skills =
        resume.skills ||
        [];

    const projects =
        resume.projects ||
        [];

    const achievements =
        resume.achievements ||
        [];

    const certifications =
        resume.certifications ||
        [];

    const profiles =
        resume.profiles ||
        {};


    let html = "";


    // HEADER

    html += `
        <div class="resume-header">

            <h1>
                ${escapeResumeHTML(name)}
            </h1>

            <p>
                ${escapeResumeHTML(contact)}
            </p>

        </div>
    `;


    // SUMMARY

    if (summary) {

        html += `

            <div class="resume-content-section">

                <h2>
                    Professional Summary
                </h2>

                <p>
                    ${escapeResumeHTML(summary)}
                </p>

            </div>

        `;

    }


    // EDUCATION

    if (education.length > 0) {

        html += `

            <div class="resume-content-section">

                <h2>
                    Education
                </h2>

                <ul>
        `;


        education.forEach(function (item) {

            const text =
                typeof item === "string"
                    ? item
                    : (
                        item.degree ||
                        item.description ||
                        item.name ||
                        ""
                    );

            html += `
                <li>
                    ${escapeResumeHTML(text)}
                </li>
            `;

        });


        html += `
                </ul>

            </div>
        `;

    }


    // SKILLS

    if (skills.length > 0) {

        html += `

            <div class="resume-content-section">

                <h2>
                    Skills
                </h2>

                <ul>
        `;


        skills.forEach(function (skill) {

            const text =
                typeof skill === "string"
                    ? skill
                    : skill.name || "";

            html += `
                <li>
                    ${escapeResumeHTML(text)}
                </li>
            `;

        });


        html += `
                </ul>

            </div>
        `;

    }


    // PROJECTS

    if (projects.length > 0) {

        html += `

            <div class="resume-content-section">

                <h2>
                    Projects
                </h2>
        `;


        projects.forEach(function (project) {

            const title =
                typeof project === "string"
                    ? project
                    : (
                        project.title ||
                        project.name ||
                        "Project"
                    );

            const description =
                typeof project === "string"
                    ? ""
                    : (
                        project.description ||
                        ""
                    );


            html += `

                <div class="resume-project">

                    <h3>
                        ${escapeResumeHTML(title)}
                    </h3>

                    ${
                        description
                            ? `
                                <p>
                                    ${escapeResumeHTML(description)}
                                </p>
                              `
                            : ""
                    }

                </div>

            `;

        });


        html += `
            </div>
        `;

    }


    // ACHIEVEMENTS

    if (achievements.length > 0) {

        html += `

            <div class="resume-content-section">

                <h2>
                    Achievements
                </h2>

                <ul>
        `;


        achievements.forEach(function (item) {

            const text =
                typeof item === "string"
                    ? item
                    : item.description || item.name || "";

            html += `
                <li>
                    ${escapeResumeHTML(text)}
                </li>
            `;

        });


        html += `
                </ul>

            </div>
        `;

    }


    // CERTIFICATIONS

    if (certifications.length > 0) {

        html += `

            <div class="resume-content-section">

                <h2>
                    Certifications
                </h2>

                <ul>
        `;


        certifications.forEach(function (item) {

            const text =
                typeof item === "string"
                    ? item
                    : item.name || item.title || "";

            html += `
                <li>
                    ${escapeResumeHTML(text)}
                </li>
            `;

        });


        html += `
                </ul>

            </div>
        `;

    }


    // PROFILES

    const profileEntries =
        Object.entries(profiles);


    if (profileEntries.length > 0) {

        html += `

            <div class="resume-content-section">

                <h2>
                    Profiles
                </h2>

                <ul>
        `;


        profileEntries.forEach(function ([key, value]) {

            if (!value) {
                return;
            }

            html += `
                <li>
                    <strong>
                        ${escapeResumeHTML(key)}:
                    </strong>

                    ${escapeResumeHTML(value)}
                </li>
            `;

        });


        html += `
                </ul>

            </div>
        `;

    }


    preview.innerHTML = html;

    result.style.display = "block";

}


// =========================================================
// SECURITY HELPER
// =========================================================

function escapeResumeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// =========================================================
// INITIALIZE RESUME BUILDER
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupResumeBuilder();

    }
);
/* =========================================================
   LEARNING DNA
   ========================================================= */

function setupLearningDNA() {

    const dnaPage =
        document.querySelector(".dna-intro-card");

    if (!dnaPage) {
        return;
    }


    /* =====================================================
       READ QUIZ DATA
       ===================================================== */

    const score =
        Number(
            localStorage.getItem("lastQuizScore")
        ) || 0;


    const correct =
        Number(
            localStorage.getItem("lastQuizCorrect")
        ) || 0;


    const total =
        Number(
            localStorage.getItem("lastQuizTotal")
        ) || 0;


    const subject =
        localStorage.getItem("lastQuizSubject")
        || "";


    const topic =
        localStorage.getItem("lastQuizTopic")
        || "";


    const difficulty =
        localStorage.getItem("lastQuizDifficulty")
        || "";


    /* =====================================================
       READ SKILL GAP DATA
       ===================================================== */

    let missingSkills = [];

    let learningOrder = [];

    let nextAction =
        "";


    try {

        missingSkills =
            JSON.parse(
                localStorage.getItem(
                    "smartLearnMissingSkills"
                ) || "[]"
            );


        learningOrder =
            JSON.parse(
                localStorage.getItem(
                    "smartLearnLearningOrder"
                ) || "[]"
            );

    }

    catch (error) {

        console.warn(
            "Learning DNA data could not be loaded.",
            error
        );

    }


    nextAction =
        localStorage.getItem(
            "smartLearnNextAction"
        ) || "";


    /* =====================================================
       DNA CARDS
       ===================================================== */

    const cards =
        document.querySelectorAll(
            ".dna-detail-card"
        );


    if (cards.length < 4) {
        return;
    }


    /* =====================================================
       KNOWLEDGE
       ===================================================== */

    const knowledgeCard =
        cards[0];


    const knowledgeProgress =
        knowledgeCard.querySelector(
            ".progress-fill"
        );


    const knowledgeTitle =
        knowledgeCard.querySelector(
            "h3"
        );


    const knowledgeText =
        knowledgeCard.querySelector(
            "p"
        );


    const knowledgeSmall =
        knowledgeCard.querySelector(
            "small"
        );


    if (score > 0) {

        if (knowledgeProgress) {

            knowledgeProgress.style.width =
                `${score}%`;

        }


        if (knowledgeTitle) {

            if (score >= 80) {

                knowledgeTitle.textContent =
                    "Strong";

            }

            else if (score >= 60) {

                knowledgeTitle.textContent =
                    "Developing";

            }

            else {

                knowledgeTitle.textContent =
                    "Needs Focus";

            }

        }


        if (knowledgeText) {

            knowledgeText.textContent =
                subject && topic
                    ? `Latest ${subject} - ${topic} quiz performance.`
                    : "Based on your latest Adaptive Quiz performance.";

        }


        if (knowledgeSmall) {

            knowledgeSmall.textContent =
                `${score}% • ${correct}/${total} correct`;

        }

    }

    else {

        if (knowledgeProgress) {

            knowledgeProgress.style.width =
                "0%";

        }


        if (knowledgeTitle) {

            knowledgeTitle.textContent =
                "Starting";

        }


        if (knowledgeText) {

            knowledgeText.textContent =
                "Complete an Adaptive Quiz to generate your first learning evidence.";

        }


        if (knowledgeSmall) {

            knowledgeSmall.textContent =
                "Quiz data required";

        }

    }


    /* =====================================================
       RETENTION
       ===================================================== */

    const retentionCard =
        cards[1];


    const retentionProgress =
        retentionCard.querySelector(
            ".progress-fill"
        );


    const retentionTitle =
        retentionCard.querySelector(
            "h3"
        );


    const retentionText =
        retentionCard.querySelector(
            "p"
        );


    const retentionSmall =
        retentionCard.querySelector(
            "small"
        );


    const quizHistory =
        getLearningDNAQuizHistory();


    if (quizHistory.length >= 2) {

        const recent =
            quizHistory.slice(-3);


        const retentionScore =
            Math.round(
                recent.reduce(
                    function (sum, item) {

                        return sum +
                            Number(item.score || 0);

                    },
                    0
                ) / recent.length
            );


        if (retentionProgress) {

            retentionProgress.style.width =
                `${retentionScore}%`;

        }


        if (retentionTitle) {

            if (retentionScore >= 80) {

                retentionTitle.textContent =
                    "Strong";

            }

            else if (retentionScore >= 60) {

                retentionTitle.textContent =
                    "Developing";

            }

            else {

                retentionTitle.textContent =
                    "Needs Revision";

            }

        }


        if (retentionText) {

            retentionText.textContent =
                "Based on performance across recent learning attempts.";

        }


        if (retentionSmall) {

            retentionSmall.textContent =
                `${recent.length} quiz attempts analyzed`;

        }

    }

    else {

        if (retentionProgress) {

            retentionProgress.style.width =
                "0%";

        }


        if (retentionTitle) {

            retentionTitle.textContent =
                "Building";

        }


        if (retentionText) {

            retentionText.textContent =
                "Complete more than one quiz to identify retention patterns.";

        }


        if (retentionSmall) {

            retentionSmall.textContent =
                "More quiz history required";

        }

    }


    /* =====================================================
       PROBLEM SOLVING
       ===================================================== */

    const problemCard =
        cards[2];


    const problemProgress =
        problemCard.querySelector(
            ".progress-fill"
        );


    const problemTitle =
        problemCard.querySelector(
            "h3"
        );


    const problemText =
        problemCard.querySelector(
            "p"
        );


    const problemSmall =
        problemCard.querySelector(
            "small"
        );


    let problemScore = 0;


    if (score > 0) {

        problemScore =
            score;

    }


    if (
        missingSkills.length > 0
    ) {

        problemScore =
            Math.max(
                0,
                problemScore -
                Math.min(
                    missingSkills.length * 5,
                    25
                )
            );

    }


    if (problemScore > 0) {

        if (problemProgress) {

            problemProgress.style.width =
                `${problemScore}%`;

        }


        if (problemTitle) {

            if (problemScore >= 80) {

                problemTitle.textContent =
                    "Strong";

            }

            else if (problemScore >= 60) {

                problemTitle.textContent =
                    "Developing";

            }

            else {

                problemTitle.textContent =
                    "Building";

            }

        }


        if (problemText) {

            problemText.textContent =
                difficulty
                    ? `Current evidence includes ${difficulty} difficulty practice.`
                    : "Based on your current quiz and skill evidence.";

        }


        if (problemSmall) {

            problemSmall.textContent =
                `${problemScore}% learning evidence`;

        }

    }

    else {

        if (problemProgress) {

            problemProgress.style.width =
                "0%";

        }


        if (problemTitle) {

            problemTitle.textContent =
                "Starting";

        }


        if (problemText) {

            problemText.textContent =
                "Complete practice activities to build problem-solving evidence.";

        }


        if (problemSmall) {

            problemSmall.textContent =
                "Practice data required";

        }

    }


    /* =====================================================
       EXPLANATION / TEACHBACK
       ===================================================== */

    const explanationCard =
        cards[3];


    const explanationProgress =
        explanationCard.querySelector(
            ".progress-fill"
        );


    const explanationTitle =
        explanationCard.querySelector(
            "h3"
        );


    const explanationText =
        explanationCard.querySelector(
            "p"
        );


    const explanationSmall =
        explanationCard.querySelector(
            "small"
        );


    const teachBackScore =
        Number(
            localStorage.getItem(
                "teachBackScore"
            )
        ) || 0;


    if (teachBackScore > 0) {

        if (explanationProgress) {

            explanationProgress.style.width =
                `${teachBackScore}%`;

        }


        if (explanationTitle) {

            if (teachBackScore >= 80) {

                explanationTitle.textContent =
                    "Strong";

            }

            else if (teachBackScore >= 60) {

                explanationTitle.textContent =
                    "Developing";

            }

            else {

                explanationTitle.textContent =
                    "Building";

            }

        }


        if (explanationText) {

            explanationText.textContent =
                "Based on your TeachBack explanation activity.";

        }


        if (explanationSmall) {

            explanationSmall.textContent =
                `${teachBackScore}% explanation evidence`;

        }

    }

    else {

        if (explanationProgress) {

            explanationProgress.style.width =
                "0%";

        }


        if (explanationTitle) {

            explanationTitle.textContent =
                "Not Tested";

        }


        if (explanationText) {

            explanationText.textContent =
                "TeachBack activities can measure how clearly you explain concepts.";

        }


        if (explanationSmall) {

            explanationSmall.textContent =
                "TeachBack activity required";

        }

    }


    /* =====================================================
       NEXT BEST ACTION
       ===================================================== */

    const nextActionHeading =
        document.querySelector(
            ".next-action-card h2"
        );


    const nextActionDescription =
        document.querySelector(
            ".next-action-card p"
        );


    const nextActionButton =
        document.querySelector(
            ".next-action-card .action-btn"
        );


    if (nextAction) {

        if (nextActionHeading) {

            nextActionHeading.textContent =
                nextAction;

        }


        if (nextActionDescription) {

            nextActionDescription.textContent =
                "This recommendation is based on your latest learning evidence and Skill Gap analysis.";

        }


        if (nextActionButton) {

            nextActionButton.textContent =
                "Continue Learning →";

            nextActionButton.onclick =
                function () {

                    if (
                        learningOrder.length > 0
                    ) {

                        window.location.href =
                            "skill-gap.html";

                    }

                    else {

                        window.location.href =
                            "adaptive-quiz.html";

                    }

                };

        }

    }

    else if (score > 0) {

        if (nextActionHeading) {

            if (score < 60) {

                nextActionHeading.textContent =
                    "Review your weaker concepts";

            }

            else {

                nextActionHeading.textContent =
                    "Continue building your skills";

            }

        }


        if (nextActionDescription) {

            nextActionDescription.textContent =
                `Latest quiz: ${score}%. Complete another learning activity to strengthen your Learning DNA.`;

        }


        if (nextActionButton) {

            nextActionButton.textContent =
                "Continue Learning →";

            nextActionButton.onclick =
                function () {

                    window.location.href =
                        "adaptive-quiz.html";

                };

        }

    }


    /* =====================================================
       SAVE DNA SUMMARY
       ===================================================== */

    localStorage.setItem(
        "learningDNASummary",
        JSON.stringify({

            knowledge:
                score,

            retention:
                quizHistory.length >= 2
                    ? Math.round(
                        quizHistory
                            .slice(-3)
                            .reduce(
                                (sum, item) =>
                                    sum +
                                    Number(
                                        item.score || 0
                                    ),
                                0
                            ) /
                        Math.min(
                            quizHistory.length,
                            3
                        )
                    )
                    : 0,

            problemSolving:
                problemScore,

            explanation:
                teachBackScore,

            latestSubject:
                subject,

            latestTopic:
                topic,

            latestDifficulty:
                difficulty,

            missingSkills:
                missingSkills,

            nextAction:
                nextAction

        })
    );

}


/* =========================================================
   LEARNING DNA QUIZ HISTORY
   ========================================================= */

function getLearningDNAQuizHistory() {

    try {

        const history =
            JSON.parse(
                localStorage.getItem(
                    "learningDNAQuizHistory"
                ) || "[]"
            );


        return Array.isArray(history)
            ? history
            : [];

    }

    catch (error) {

        return [];

    }

}


/* =========================================================
   SAVE QUIZ TO LEARNING DNA HISTORY
   ========================================================= */

function saveQuizToLearningDNAHistory() {

    const score =
        Number(
            localStorage.getItem(
                "lastQuizScore"
            )
        ) || 0;


    const correct =
        Number(
            localStorage.getItem(
                "lastQuizCorrect"
            )
        ) || 0;


    const total =
        Number(
            localStorage.getItem(
                "lastQuizTotal"
            )
        ) || 0;


    const subject =
        localStorage.getItem(
            "lastQuizSubject"
        ) || "";


    const topic =
        localStorage.getItem(
            "lastQuizTopic"
        ) || "";


    const difficulty =
        localStorage.getItem(
            "lastQuizDifficulty"
        ) || "";


    const history =
        getLearningDNAQuizHistory();


    history.push({

        score:
            score,

        correct:
            correct,

        total:
            total,

        subject:
            subject,

        topic:
            topic,

        difficulty:
            difficulty,

        timestamp:
            new Date().toISOString()

    });


    /* Keep latest 20 attempts */

    const trimmedHistory =
        history.slice(-20);


    localStorage.setItem(
        "learningDNAQuizHistory",
        JSON.stringify(
            trimmedHistory
        )
    );

}