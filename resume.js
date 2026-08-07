// ==========================================
// RESUME BUILDER
// ==========================================


// ===============================
// BASIC INPUTS
// ===============================

const basicFields = [
    "name",
    "email",
    "phone",
    "location",
    "linkedin",
    "github",
    "portfolio",
    "summary",
    "programming",
    "frameworks",
    "database",
    "tools",
    "achievements"
];


// ===============================
// LIVE UPDATE
// ===============================

basicFields.forEach((id) => {

    const element =
        document.getElementById(id);

    if (element) {

        element.addEventListener(
            "input",
            updateResume
        );

    }

});


// ===============================
// EDUCATION
// ===============================

const educationContainer =
    document.getElementById(
        "educationContainer"
    );

const addEducation =
    document.getElementById(
        "addEducation"
    );


addEducation.addEventListener(
    "click",
    () => {

        const item =
            document.createElement("div");

        item.className =
            "dynamic-item education-item";

        item.innerHTML = `

            <button
                class="remove-btn"
                type="button"
            >
                Remove
            </button>

            <div class="form-grid">

                <div class="form-group">

                    <label>Degree / Course</label>

                    <input
                        class="edu-degree"
                        placeholder="B.Tech in Electronics & Communication"
                    >

                </div>

                <div class="form-group">

                    <label>College / University</label>

                    <input
                        class="edu-college"
                        placeholder="Government Engineering College"
                    >

                </div>

                <div class="form-group">

                    <label>Year</label>

                    <input
                        class="edu-year"
                        placeholder="2024 - 2028"
                    >

                </div>

                <div class="form-group">

                    <label>CGPA / Percentage</label>

                    <input
                        class="edu-score"
                        placeholder="8.5 CGPA"
                    >

                </div>

            </div>
        `;


        educationContainer.appendChild(item);


        item.querySelector(".remove-btn")
            .addEventListener(
                "click",
                () => {

                    item.remove();

                    updateResume();

                }
            );


        item.querySelectorAll("input")
            .forEach((input) => {

                input.addEventListener(
                    "input",
                    updateResume
                );

            });

    }
);


// ===============================
// PROJECTS
// ===============================

const projectContainer =
    document.getElementById(
        "projectContainer"
    );

document.getElementById(
    "addProject"
).addEventListener(
    "click",
    () => {

        const item =
            document.createElement("div");

        item.className =
            "dynamic-item project-item";

        item.innerHTML = `

            <button
                class="remove-btn"
                type="button"
            >
                Remove
            </button>

            <div class="form-group">

                <label>Project Name</label>

                <input
                    class="project-name"
                    placeholder="Student Safety System"
                >

            </div>

            <div class="form-group">

                <label>Technologies</label>

                <input
                    class="project-tech"
                    placeholder="HTML, CSS, JavaScript, Firebase"
                >

            </div>

            <div class="form-group">

                <label>Project Link</label>

                <input
                    class="project-link"
                    placeholder="GitHub / Live Demo URL"
                >

            </div>

            <div class="form-group">

                <label>Project Description</label>

                <textarea
                    class="project-description"
                    rows="4"
                    placeholder="Describe what you built and the problem it solves."
                ></textarea>

            </div>
        `;


        projectContainer.appendChild(item);


        item.querySelector(".remove-btn")
            .addEventListener(
                "click",
                () => {

                    item.remove();

                    updateResume();

                }
            );


        item.querySelectorAll(
            "input, textarea"
        ).forEach((input) => {

            input.addEventListener(
                "input",
                updateResume
            );

        });

    }
);


// ===============================
// EXPERIENCE
// ===============================

const experienceContainer =
    document.getElementById(
        "experienceContainer"
    );


document.getElementById(
    "addExperience"
).addEventListener(
    "click",
    () => {

        const item =
            document.createElement("div");

        item.className =
            "dynamic-item experience-item";

        item.innerHTML = `

            <button
                class="remove-btn"
                type="button"
            >
                Remove
            </button>

            <div class="form-grid">

                <div class="form-group">

                    <label>Role</label>

                    <input
                        class="exp-role"
                        placeholder="Software Developer Intern"
                    >

                </div>

                <div class="form-group">

                    <label>Company</label>

                    <input
                        class="exp-company"
                        placeholder="Company Name"
                    >

                </div>

                <div class="form-group">

                    <label>Duration</label>

                    <input
                        class="exp-duration"
                        placeholder="May 2026 - July 2026"
                    >

                </div>

            </div>

            <div class="form-group">

                <label>Responsibilities / Achievements</label>

                <textarea
                    class="exp-description"
                    rows="4"
                    placeholder="Describe your work and measurable achievements."
                ></textarea>

            </div>
        `;


        experienceContainer.appendChild(item);


        item.querySelector(".remove-btn")
            .addEventListener(
                "click",
                () => {

                    item.remove();

                    updateResume();

                }
            );


        item.querySelectorAll(
            "input, textarea"
        ).forEach((input) => {

            input.addEventListener(
                "input",
                updateResume
            );

        });

    }
);


// ===============================
// CERTIFICATIONS
// ===============================

const certificationContainer =
    document.getElementById(
        "certificationContainer"
    );


document.getElementById(
    "addCertification"
).addEventListener(
    "click",
    () => {

        const item =
            document.createElement("div");

        item.className =
            "dynamic-item certification-item";

        item.innerHTML = `

            <button
                class="remove-btn"
                type="button"
            >
                Remove
            </button>

            <div class="form-grid">

                <div class="form-group">

                    <label>Certification</label>

                    <input
                        class="cert-name"
                        placeholder="Google Data Analytics"
                    >

                </div>

                <div class="form-group">

                    <label>Issuing Organization</label>

                    <input
                        class="cert-org"
                        placeholder="Google"
                    >

                </div>

                <div class="form-group">

                    <label>Year</label>

                    <input
                        class="cert-year"
                        placeholder="2026"
                    >

                </div>

            </div>
        `;


        certificationContainer.appendChild(item);


        item.querySelector(".remove-btn")
            .addEventListener(
                "click",
                () => {

                    item.remove();

                    updateResume();

                }
            );


        item.querySelectorAll("input")
            .forEach((input) => {

                input.addEventListener(
                    "input",
                    updateResume
                );

            });

    }
);


// ===============================
// UPDATE RESUME
// ===============================

function updateResume() {

    // Personal
    setText(
        "previewName",
        value("name") || "YOUR NAME"
    );


    const contact = [

        value("email"),

        value("phone"),

        value("location")

    ].filter(Boolean).join(" • ");


    setText(
        "previewContact",
        contact || "Email • Phone • Location"
    );


    const links = [

        value("linkedin"),

        value("github"),

        value("portfolio")

    ].filter(Boolean).join(" • ");


    setText(
        "previewLinks",
        links || "LinkedIn • GitHub • Portfolio"
    );


    // Summary
    const summary =
        value("summary");


    setText(
        "previewSummary",
        summary ||
        "Your professional summary will appear here."
    );


    // Skills
    updateSkills();


    // Education
    updateEducation();


    // Projects
    updateProjects();


    // Experience
    updateExperience();


    // Certifications
    updateCertifications();


    // Achievements
    updateAchievements();

}


// ===============================
// EDUCATION PREVIEW
// ===============================

function updateEducation() {

    const preview =
        document.getElementById(
            "previewEducation"
        );

    const items =
        document.querySelectorAll(
            ".education-item"
        );


    preview.innerHTML = "";


    items.forEach((item) => {

        const degree =
            item.querySelector(
                ".edu-degree"
            ).value;

        const college =
            item.querySelector(
                ".edu-college"
            ).value;

        const year =
            item.querySelector(
                ".edu-year"
            ).value;

        const score =
            item.querySelector(
                ".edu-score"
            ).value;


        if (
            !degree &&
            !college &&
            !year &&
            !score
        ) return;


        const entry =
            document.createElement("div");

        entry.className =
            "resume-entry";


        entry.innerHTML = `

            <div class="resume-entry-header">

                <strong>
                    ${escapeHTML(degree)}
                </strong>

                <span>
                    ${escapeHTML(year)}
                </span>

            </div>

            <p>
                ${escapeHTML(college)}
                ${score ? " • " + escapeHTML(score) : ""}
            </p>

        `;


        preview.appendChild(entry);

    });

}


// ===============================
// SKILLS
// ===============================

function updateSkills() {

    const preview =
        document.getElementById(
            "previewSkills"
        );


    const skills = [

        [
            "Programming",
            value("programming")
        ],

        [
            "Frameworks",
            value("frameworks")
        ],

        [
            "Database / Cloud",
            value("database")
        ],

        [
            "Tools",
            value("tools")
        ]

    ];


    preview.innerHTML = "";


    skills.forEach(
        ([label, content]) => {

            if (!content) return;


            const row =
                document.createElement("div");

            row.className =
                "skill-row";


            row.innerHTML = `

                <strong>
                    ${label}
                </strong>

                <span>
                    ${escapeHTML(content)}
                </span>

            `;


            preview.appendChild(row);

        }
    );

}


// ===============================
// PROJECTS
// ===============================

function updateProjects() {

    const preview =
        document.getElementById(
            "previewProjects"
        );


    const items =
        document.querySelectorAll(
            ".project-item"
        );


    preview.innerHTML = "";


    items.forEach((item) => {

        const name =
            item.querySelector(
                ".project-name"
            ).value;

        const tech =
            item.querySelector(
                ".project-tech"
            ).value;

        const link =
            item.querySelector(
                ".project-link"
            ).value;

        const description =
            item.querySelector(
                ".project-description"
            ).value;


        if (
            !name &&
            !tech &&
            !description
        ) return;


        const entry =
            document.createElement("div");

        entry.className =
            "project-entry";


        const bullets =
            description
                .split("\n")
                .filter(Boolean);


        let bulletHTML = "";


        if (bullets.length) {

            bulletHTML = `

                <ul>

                    ${bullets.map(
                        bullet =>
                            `<li>${escapeHTML(bullet)}</li>`
                    ).join("")}

                </ul>

            `;

        }


        entry.innerHTML = `

            <strong>
                ${escapeHTML(name)}
            </strong>

            ${tech ? `
                <div class="tech">
                    ${escapeHTML(tech)}
                </div>
            ` : ""}

            ${link ? `
                <div class="tech">
                    ${escapeHTML(link)}
                </div>
            ` : ""}

            ${bulletHTML}

        `;


        preview.appendChild(entry);

    });

}


// ===============================
// EXPERIENCE
// ===============================

function updateExperience() {

    const preview =
        document.getElementById(
            "previewExperience"
        );


    const items =
        document.querySelectorAll(
            ".experience-item"
        );


    preview.innerHTML = "";


    items.forEach((item) => {

        const role =
            item.querySelector(
                ".exp-role"
            ).value;

        const company =
            item.querySelector(
                ".exp-company"
            ).value;

        const duration =
            item.querySelector(
                ".exp-duration"
            ).value;

        const description =
            item.querySelector(
                ".exp-description"
            ).value;


        if (
            !role &&
            !company &&
            !description
        ) return;


        const entry =
            document.createElement("div");

        entry.className =
            "resume-entry";


        entry.innerHTML = `

            <div class="resume-entry-header">

                <strong>
                    ${escapeHTML(role)}
                </strong>

                <span>
                    ${escapeHTML(duration)}
                </span>

            </div>

            <p>
                ${escapeHTML(company)}
            </p>

            ${
                description
                ? `<p>${escapeHTML(description)}</p>`
                : ""
            }

        `;


        preview.appendChild(entry);

    });

}


// ===============================
// CERTIFICATIONS
// ===============================

function updateCertifications() {

    const preview =
        document.getElementById(
            "previewCertifications"
        );


    const items =
        document.querySelectorAll(
            ".certification-item"
        );


    preview.innerHTML = "";


    items.forEach((item) => {

        const name =
            item.querySelector(
                ".cert-name"
            ).value;

        const organization =
            item.querySelector(
                ".cert-org"
            ).value;

        const year =
            item.querySelector(
                ".cert-year"
            ).value;


        if (
            !name &&
            !organization
        ) return;


        const entry =
            document.createElement("div");

        entry.className =
            "resume-entry";


        entry.innerHTML = `

            <div class="resume-entry-header">

                <strong>
                    ${escapeHTML(name)}
                </strong>

                <span>
                    ${escapeHTML(year)}
                </span>

            </div>

            <p>
                ${escapeHTML(organization)}
            </p>

        `;


        preview.appendChild(entry);

    });

}


// ===============================
// ACHIEVEMENTS
// ===============================

function updateAchievements() {

    const preview =
        document.getElementById(
            "previewAchievements"
        );


    const achievements =
        value("achievements");


    preview.innerHTML = "";


    if (!achievements) return;


    const lines =
        achievements
            .split("\n")
            .filter(Boolean);


    preview.innerHTML = `

        <ul style="
            padding-left:17px;
        ">

            ${lines.map(
                line =>
                    `<li style="
                        font-size:10px;
                        margin-bottom:3px;
                    ">
                        ${escapeHTML(line)}
                    </li>`
            ).join("")}

        </ul>

    `;

}


// ===============================
// HELPERS
// ===============================

function value(id) {

    const element =
        document.getElementById(id);

    return element
        ? element.value.trim()
        : "";

}


function setText(id, text) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent = text;

    }

}


function escapeHTML(value) {

    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


// ===============================
// GENERATE BUTTON
// ===============================

document.getElementById(
    "generateBtn"
).addEventListener(
    "click",
    () => {

        updateResume();

        document
            .getElementById(
                "resumePreview"
            )
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


// ===============================
// PRINT / SAVE PDF
// ===============================

document.getElementById(
    "downloadBtn"
).addEventListener(
    "click",
    () => {

        updateResume();

        