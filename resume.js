// ======================================================
// RESUME BUILDER - COMPLETE VERSION
// ATS FRIENDLY / STUDENT PLACEMENT RESUME
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    // ==================================================
    // BASIC ELEMENTS
    // ==================================================

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

    const educationContainer =
        document.getElementById("educationContainer");

    const projectContainer =
        document.getElementById("projectContainer");

    const experienceContainer =
        document.getElementById("experienceContainer");

    const certificationContainer =
        document.getElementById("certificationContainer");


    // ==================================================
    // SAFE EVENT LISTENER
    // ==================================================

    function onClick(id, callback) {

        const element = document.getElementById(id);

        if (element) {
            element.addEventListener("click", callback);
        }
    }


    // ==================================================
    // BASIC INPUT LIVE UPDATE
    // ==================================================

    basicFields.forEach((id) => {

        const element = document.getElementById(id);

        if (element) {

            element.addEventListener("input", () => {

                updateResume();
                saveResume();

            });

        }

    });


    // ==================================================
    // EDUCATION
    // ==================================================

    onClick("addEducation", () => {

        const item = document.createElement("div");

        item.className = "dynamic-item education-item";

        item.innerHTML = `

            <button
                type="button"
                class="remove-btn"
            >
                ✕ Remove
            </button>

            <div class="form-grid">

                <div class="form-group">

                    <label>Degree / Course</label>

                    <input
                        type="text"
                        class="edu-degree"
                        placeholder="B.Tech in Electronics & Communication"
                    >

                </div>

                <div class="form-group">

                    <label>College / University</label>

                    <input
                        type="text"
                        class="edu-college"
                        placeholder="Government Engineering College"
                    >

                </div>

                <div class="form-group">

                    <label>Year</label>

                    <input
                        type="text"
                        class="edu-year"
                        placeholder="2024 - 2028"
                    >

                </div>

                <div class="form-group">

                    <label>CGPA / Percentage</label>

                    <input
                        type="text"
                        class="edu-score"
                        placeholder="8.5 CGPA"
                    >

                </div>

            </div>
        `;

        educationContainer.appendChild(item);

        attachDynamicEvents(item);

        updateResume();

    });


    // ==================================================
    // PROJECTS
    // ==================================================

    onClick("addProject", () => {

        const item = document.createElement("div");

        item.className = "dynamic-item project-item";

        item.innerHTML = `

            <button
                type="button"
                class="remove-btn"
            >
                ✕ Remove
            </button>

            <div class="form-group">

                <label>Project Name</label>

                <input
                    type="text"
                    class="project-name"
                    placeholder="Student Safety System"
                >

            </div>

            <div class="form-group">

                <label>Technologies</label>

                <input
                    type="text"
                    class="project-tech"
                    placeholder="HTML, CSS, JavaScript, Firebase"
                >

            </div>

            <div class="form-group">

                <label>Project Link</label>

                <input
                    type="url"
                    class="project-link"
                    placeholder="https://github.com/username/project"
                >

            </div>

            <div class="form-group">

                <label>
                    Description / Achievements
                </label>

                <textarea
                    class="project-description"
                    rows="5"
                    placeholder="Built a student safety platform using HTML, CSS, JavaScript and Firebase.
Implemented emergency contact, SOS, digital locker and location features.
Designed a responsive interface for mobile users."
                ></textarea>

            </div>
        `;

        projectContainer.appendChild(item);

        attachDynamicEvents(item);

        updateResume();

    });


    // ==================================================
    // EXPERIENCE
    // ==================================================

    onClick("addExperience", () => {

        const item = document.createElement("div");

        item.className = "dynamic-item experience-item";

        item.innerHTML = `

            <button
                type="button"
                class="remove-btn"
            >
                ✕ Remove
            </button>

            <div class="form-grid">

                <div class="form-group">

                    <label>Role</label>

                    <input
                        type="text"
                        class="exp-role"
                        placeholder="Software Developer Intern"
                    >

                </div>

                <div class="form-group">

                    <label>Company</label>

                    <input
                        type="text"
                        class="exp-company"
                        placeholder="Company Name"
                    >

                </div>

                <div class="form-group">

                    <label>Duration</label>

                    <input
                        type="text"
                        class="exp-duration"
                        placeholder="May 2026 - July 2026"
                    >

                </div>

            </div>

            <div class="form-group">

                <label>
                    Responsibilities / Achievements
                </label>

                <textarea
                    class="exp-description"
                    rows="5"
                    placeholder="Developed responsive web interfaces.
Worked with JavaScript and Firebase.
Improved application usability and performance."
                ></textarea>

            </div>
        `;

        experienceContainer.appendChild(item);

        attachDynamicEvents(item);

        updateResume();

    });


    // ==================================================
    // CERTIFICATIONS
    // ==================================================

    onClick("addCertification", () => {

        const item = document.createElement("div");

        item.className = "dynamic-item certification-item";

        item.innerHTML = `

            <button
                type="button"
                class="remove-btn"
            >
                ✕ Remove
            </button>

            <div class="form-grid">

                <div class="form-group">

                    <label>Certification</label>

                    <input
                        type="text"
                        class="cert-name"
                        placeholder="Python for Everybody"
                    >

                </div>

                <div class="form-group">

                    <label>Issuing Organization</label>

                    <input
                        type="text"
                        class="cert-org"
                        placeholder="Coursera / Google / IBM"
                    >

                </div>

                <div class="form-group">

                    <label>Year</label>

                    <input
                        type="text"
                        class="cert-year"
                        placeholder="2026"
                    >

                </div>

            </div>
        `;

        certificationContainer.appendChild(item);

        attachDynamicEvents(item);

        updateResume();

    });


    // ==================================================
    // DYNAMIC ELEMENT EVENTS
    // ==================================================

    function attachDynamicEvents(item) {

        const removeButton =
            item.querySelector(".remove-btn");

        if (removeButton) {

            removeButton.addEventListener("click", () => {

                item.remove();

                updateResume();
                saveResume();

            });

        }


        item.querySelectorAll(
            "input, textarea"
        ).forEach((element) => {

            element.addEventListener("input", () => {

                updateResume();
                saveResume();

            });

        });

    }


    // ==================================================
    // UPDATE COMPLETE RESUME
    // ==================================================

    function updateResume() {

        updatePersonal();

        updateSummary();

        updateEducation();

        updateSkills();

        updateProjects();

        updateExperience();

        updateCertifications();

        updateAchievements();

        updateSectionVisibility();

    }


    // ==================================================
    // PERSONAL INFORMATION
    // ==================================================

    function updatePersonal() {

        setText(
            "previewName",
            value("name") || "YOUR NAME"
        );


        const contact = [
            value("email"),
            value("phone"),
            value("location")
        ]
        .filter(Boolean)
        .join(" • ");


        setText(
            "previewContact",
            contact || "Email • Phone • Location"
        );


        const links = [
            value("linkedin"),
            value("github"),
            value("portfolio")
        ]
        .filter(Boolean)
        .join(" • ");


        setText(
            "previewLinks",
            links || "LinkedIn • GitHub • Portfolio"
        );

    }


    // ==================================================
    // SUMMARY
    // ==================================================

    function updateSummary() {

        const summary =
            value("summary");


        setText(
            "previewSummary",
            summary ||
            "Your professional summary will appear here."
        );

    }


    // ==================================================
    // EDUCATION PREVIEW
    // ==================================================

    function updateEducation() {

        const preview =
            document.getElementById(
                "previewEducation"
            );

        if (!preview) return;

        preview.innerHTML = "";


        document
            .querySelectorAll(".education-item")
            .forEach((item) => {

                const degree =
                    getValue(item, ".edu-degree");

                const college =
                    getValue(item, ".edu-college");

                const year =
                    getValue(item, ".edu-year");

                const score =
                    getValue(item, ".edu-score");


                if (
                    !degree &&
                    !college &&
                    !year &&
                    !score
                ) {
                    return;
                }


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
                        ${
                            score
                            ? " • " +
                              escapeHTML(score)
                            : ""
                        }
                    </p>

                `;


                preview.appendChild(entry);

            });

    }


    // ==================================================
    // SKILLS
    // ==================================================

    function updateSkills() {

        const preview =
            document.getElementById(
                "previewSkills"
            );

        if (!preview) return;

        preview.innerHTML = "";


        const skills = [

            [
                "Programming",
                value("programming")
            ],

            [
                "Web / Frameworks",
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


        skills.forEach(
            ([label, content]) => {

                if (!content) return;


                const row =
                    document.createElement("div");

                row.className =
                    "skill-row";


                row.innerHTML = `

                    <strong>
                        ${escapeHTML(label)}
                    </strong>

                    <span>
                        ${escapeHTML(content)}
                    </span>

                `;


                preview.appendChild(row);

            }
        );

    }


    // ==================================================
    // PROJECTS
    // ==================================================

    function updateProjects() {

        const preview =
            document.getElementById(
                "previewProjects"
            );

        if (!preview) return;

        preview.innerHTML = "";


        document
            .querySelectorAll(".project-item")
            .forEach((item) => {

                const name =
                    getValue(
                        item,
                        ".project-name"
                    );

                const tech =
                    getValue(
                        item,
                        ".project-tech"
                    );

                const link =
                    getValue(
                        item,
                        ".project-link"
                    );

                const description =
                    getValue(
                        item,
                        ".project-description"
                    );


                if (
                    !name &&
                    !tech &&
                    !description
                ) {
                    return;
                }


                const entry =
                    document.createElement("div");

                entry.className =
                    "project-entry";


                let bullets = "";


                if (description) {

                    const lines =
                        description
                            .split("\n")
                            .map(line => line.trim())
                            .filter(Boolean);


                    bullets = `

                        <ul>

                            ${
                                lines.map(
                                    line =>
                                    `<li>
                                        ${escapeHTML(line)}
                                    </li>`
                                ).join("")
                            }

                        </ul>

                    `;

                }


                entry.innerHTML = `

                    <strong>
                        ${escapeHTML(name)}
                    </strong>

                    ${
                        tech
                        ? `
                            <div class="tech">
                                ${escapeHTML(tech)}
                            </div>
                          `
                        : ""
                    }

                    ${
                        link
                        ? `
                            <div class="project-link">
                                <a
                                    href="${safeURL(link)}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    ${escapeHTML(link)}
                                </a>
                            </div>
                          `
                        : ""
                    }

                    ${bullets}

                `;


                preview.appendChild(entry);

            });

    }


    // ==================================================
    // EXPERIENCE
    // ==================================================

    function updateExperience() {

        const preview =
            document.getElementById(
                "previewExperience"
            );

        if (!preview) return;

        preview.innerHTML = "";


        document
            .querySelectorAll(".experience-item")
            .forEach((item) => {

                const role =
                    getValue(
                        item,
                        ".exp-role"
                    );

                const company =
                    getValue(
                        item,
                        ".exp-company"
                    );

                const duration =
                    getValue(
                        item,
                        ".exp-duration"
                    );

                const description =
                    getValue(
                        item,
                        ".exp-description"
                    );


                if (
                    !role &&
                    !company &&
                    !description
                ) {
                    return;
                }


                const entry =
                    document.createElement("div");

                entry.className =
                    "resume-entry";


                let bulletHTML = "";


                if (description) {

                    const lines =
                        description
                            .split("\n")
                            .map(line => line.trim())
                            .filter(Boolean);


                    bulletHTML = `

                        <ul>

                            ${
                                lines.map(
                                    line =>
                                    `<li>
                                        ${escapeHTML(line)}
                                    </li>`
                                ).join("")
                            }

                        </ul>

                    `;

                }


                entry.innerHTML = `

                    <div class="resume-entry-header">

                        <strong>
                            ${escapeHTML(role)}
                        </strong>

                        <span>
                            ${escapeHTML(duration)}
                        </span>

                    </div>

                    ${
                        company
                        ? `
                            <p>
                                ${escapeHTML(company)}
                            </p>
                          `
                        : ""
                    }

                    ${bulletHTML}

                `;


                preview.appendChild(entry);

            });

    }


    // ==================================================
    // CERTIFICATIONS
    // ==================================================

    function updateCertifications() {

        const preview =
            document.getElementById(
                "previewCertifications"
            );

        if (!preview) return;

        preview.innerHTML = "";


        document
            .querySelectorAll(
                ".certification-item"
            )
            .forEach((item) => {

                const name =
                    getValue(
                        item,
                        ".cert-name"
                    );

                const organization =
                    getValue(
                        item,
                        ".cert-org"
                    );

                const year =
                    getValue(
                        item,
                        ".cert-year"
                    );


                if (
                    !name &&
                    !organization &&
                    !year
                ) {
                    return;
                }


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

                    ${
                        organization
                        ? `
                            <p>
                                ${escapeHTML(
                                    organization
                                )}
                            </p>
                          `
                        : ""
                    }

                `;


                preview.appendChild(entry);

            });

    }


    // ==================================================
    // ACHIEVEMENTS
    // ==================================================

    function updateAchievements() {

        const preview =
            document.getElementById(
                "previewAchievements"
            );

        if (!preview) return;

        preview.innerHTML = "";


        const achievements =
            value("achievements");


        if (!achievements) return;


        const lines =
            achievements
                .split("\n")
                .map(line => line.trim())
                .filter(Boolean);


        const ul =
            document.createElement("ul");


        lines.forEach((line) => {

            const li =
                document.createElement("li");

            li.textContent = line;

            ul.appendChild(li);

        });


        preview.appendChild(ul);

    }


    // ==================================================
    // HIDE EMPTY SECTIONS
    // ==================================================

    function updateSectionVisibility() {

        toggleSection(
            "previewSummarySection",
            Boolean(value("summary"))
        );


        toggleSection(
            "previewEducationSection",
            document.querySelectorAll(
                ".education-item"
            ).length > 0
        );


        toggleSection(
            "previewProjectsSection",
            document.querySelectorAll(
                ".project-item"
            ).length > 0
        );


        toggleSection(
            "previewExperienceSection",
            document.querySelectorAll(
                ".experience-item"
            ).length > 0
        );


        toggleSection(
            "previewCertificationSection",
            document.querySelectorAll(
                ".certification-item"
            ).length > 0
        );


        toggleSection(
            "previewAchievementsSection",
            Boolean(value("achievements"))
        );

    }


    function toggleSection(id, show) {

        const section =
            document.getElementById(id);

        if (!section) return;

        section.style.display =
            show ? "" : "none";

    }


    // ==================================================
    // GENERATE RESUME
    // ==================================================

    onClick("generateBtn", () => {

        updateResume();

        saveResume();


        const name =
            value("name");


        if (!name) {

            alert(
                "Please enter your full name first."
            );

            const nameInput =
                document.getElementById("name");

            if (nameInput) {
                nameInput.focus();
            }

            return;
        }


        const preview =
            document.getElementById(
                "resumePreview"
            );


        if (preview) {

            preview.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });


    // ==================================================
    // PRINT / SAVE PDF
    // ==================================================

    onClick("downloadBtn", () => {

        updateResume();

        window.print();

    });


    // ==================================================
    // LOCAL STORAGE
    // ==================================================

    function saveResume() {

        try {

            const data = {

                basic: {},

                education: [],

                projects: [],

                experience: [],

                certifications: []

            };


            // Basic fields
            basicFields.forEach((id) => {

                const element =
                    document.getElementById(id);

                if (element) {

                    data.basic[id] =
                        element.value;

                }

            });


            // Education
            document
                .querySelectorAll(
                    ".education-item"
                )
                .forEach((item) => {

                    data.education.push({

                        degree:
                            getValue(
                                item,
                                ".edu-degree"
                            ),

                        college:
                            getValue(
                                item,
                                ".edu-college"
                            ),

                        year:
                            getValue(
                                item,
                                ".edu-year"
                            ),

                        score:
                            getValue(
                                item,
                                ".edu-score"
                            )

                    });

                });


            // Projects
            document
                .querySelectorAll(
                    ".project-item"
                )
                .forEach((item) => {

                    data.projects.push({

                        name:
                            getValue(
                                item,
                                ".project-name"
                            ),

                        tech:
                            getValue(
                                item,
                                ".project-tech"
                            ),

                        link:
                            getValue(
                                item,
                                ".project-link"
                            ),

                        description:
                            getValue(
                                item,
                                ".project-description"
                            )

                    });

                });


            // Experience
            document
                .querySelectorAll(
                    ".experience-item"
                )
                .forEach((item) => {

                    data.experience.push({

                        role:
                            getValue(
                                item,
                                ".exp-role"
                            ),

                        company:
                            getValue(
                                item,
                                ".exp-company"
                            ),

                        duration:
                            getValue(
                                item,
                                ".exp-duration"
                            ),

                        description:
                            getValue(
                                item,
                                ".exp-description"
                            )

                    });

                });


            // Certifications
            document
                .querySelectorAll(
                    ".certification-item"
                )
                .forEach((item) => {

                    data.certifications.push({

                        name:
                            getValue(
                                item,
                                ".cert-name"
                            ),

                        organization:
                            getValue(
                                item,
                                ".cert-org"
                            ),

                        year:
                            getValue(
                                item,
                                ".cert-year"
                            )

                    });

                });


            localStorage.setItem(
                "studentResumeData",
                JSON.stringify(data)
            );

        } catch (error) {

            console.error(
                "Could not save resume:",
                error
            );

        }

    }


    // ==================================================
    // LOAD SAVED RESUME
    // ==================================================

    function loadResume() {

        try {

            const saved =
                localStorage.getItem(
                    "studentResumeData"
                );


            if (!saved) return;


            const data =
                JSON.parse(saved);


            // Basic fields
            if (data.basic) {

                Object.entries(
                    data.basic
                ).forEach(
                    ([id, storedValue]) => {

                        const element =
                            document.getElementById(id);

                        if (element) {

                            element.value =
                                storedValue || "";

                        }

                    }
                );

            }


            // Education
            if (
                Array.isArray(data.education)
            ) {

                data.education.forEach(
                    (edu) => {

                        addSavedEducation(edu);

                    }
                );

            }


            // Projects
            if (
                Array.isArray(data.projects)
            ) {

                data.projects.forEach(
                    (project) => {

                        addSavedProject(project);

                    }
                );

            }


            // Experience
            if (
                Array.isArray(data.experience)
            ) {

                data.experience.forEach(
                    (experience) => {

                        addSavedExperience(
                            experience
                        );

                    }
                );

            }


            // Certifications
            if (
                Array.isArray(
                    data.certifications
                )
            ) {

                data.certifications.forEach(
                    (certification) => {

                        addSavedCertification(
                            certification
                        );

                    }
                );

            }

        } catch (error) {

            console.error(
                "Could not load saved resume:",
                error
            );

        }

    }


    // ==================================================
    // SAVED EDUCATION
    // ==================================================

    function addSavedEducation(data) {

        if (!educationContainer) return;


        const item =
            document.createElement("div");

        item.className =
            "dynamic-item education-item";


        item.innerHTML = `

            <button
                type="button"
                class="remove-btn"
            >
                ✕ Remove
            </button>

            <div class="form-grid">

                <div class="form-group">

                    <label>Degree / Course</label>

                    <input
                        class="edu-degree"
                        value="${escapeAttribute(
                            data.degree
                        )}"
                    >

                </div>

                <div class="form-group">

                    <label>College / University</label>

                    <input
                        class="edu-college"
                        value="${escapeAttribute(
                            data.college
                        )}"
                    >

                </div>

                <div class="form-group">

                    <label>Year</label>

                    <input
                        class="edu-year"
                        value="${escapeAttribute(
                            data.year
                        )}"
                    >

                </div>

                <div class="form-group">

                    <label>CGPA / Percentage</label>

                    <input
                        class="edu-score"
                        value="${escapeAttribute(
                            data.score
                        )}"
                    >

                </div>

            </div>
        `;


        educationContainer.appendChild(item);

        attachDynamicEvents(item);

    }


    // ==================================================
    // SAVED PROJECT
    // ==================================================

    function addSavedProject(data) {

        if (!projectContainer) return;


        const item =
            document.createElement("div");

        item.className =
            "dynamic-item project-item";


        item.innerHTML = `

            <button
                type="button"
                class="remove-btn"
            >
                ✕ Remove
            </button>

            <div class="form-group">

                <label>Project Name</label>

                <input
                    class="project-name"
                    value="${escapeAttribute(
                        data.name
                    )}"
                >

            </div>

            <div class="form-group">

                <label>Technologies</label>

                <input
                    class="project-tech"
                    value="${escapeAttribute(
                        data.tech
                    )}"
                >

            </div>

            <div class="form-group">

                <label>Project Link</label>

                <input
                    class="project-link"
                    value="${escapeAttribute(
                        data.link
                    )}"
                >

            </div>

            <div class="form-group">

                <label>Description / Achievements</label>

                <textarea
                    class="project-description"
                    rows="5"
                >${escapeHTML(
                    data.description
                )}</textarea>

            </div>
        `;


        projectContainer.appendChild(item);

        attachDynamicEvents(item);

    }


    // ==================================================
    // SAVED EXPERIENCE
    // ==================================================

    function addSavedExperience(data) {

        if (!experienceContainer) return;


        const item =
            document.createElement("div");

        item.className =
            "dynamic-item experience-item";


        item.innerHTML = `

            <button
                type="button"
                class="remove-btn"
            >
                ✕ Remove
            </button>

            <div class="form-grid">

                <div class="form-group">

                    <label>Role</label>

                    <input
                        class="exp-role"
                        value="${escapeAttribute(
                            data.role
                        )}"
                    >

                </div>

                <div class="form-group">

                    <label>Company</label>

                    <input
                        class="exp-company"
                        value="${escapeAttribute(
                            data.company
                        )}"
                    >

                </div>

                <div class="form-group">

                    <label>Duration</label>

                    <input
                        class="exp-duration"
                        value="${escapeAttribute(
                            data.duration
                        )}"
                    >

                </div>

            </div>

            <div class="form-group">

                <label>
                    Responsibilities / Achievements
                </label>

                <textarea
                    class="exp-description"
                    rows="5"
                >${escapeHTML(
                    data.description
                )}</textarea>

            </div>
        `;


        experienceContainer.appendChild(item);

        attachDynamicEvents(item);

    }


    // ==================================================
    // SAVED CERTIFICATION
    // ==================================================

    function addSavedCertification(data) {

        if (!certificationContainer) return;


        const item =
            document.createElement("div");

        item.className =
            "dynamic-item certification-item";


        item.innerHTML = `

            <button
                type="button"
                class="remove-btn"
            >
                ✕ Remove
            </button>

            <div class="form-grid">

                <div class="form-group">

                    <label>Certification</label>

                    <input
                        class="cert-name"
                        value="${escapeAttribute(
                            data.name
                        )}"
                    >

                </div>

                <div class="form-group">

                    <label>Issuing Organization</label>

                    <input
                        class="cert-org"
                        value="${escapeAttribute(
                            data.organization
                        )}"
                    >

                </div>

                <div class="form-group">

                    <label>Year</label>

                    <input
                        class="cert-year"
                        value="${escapeAttribute(
                            data.year
                        )}"
                    >

                </div>

            </div>
        `;


        certificationContainer.appendChild(item);

        attachDynamicEvents(item);

    }


    // ==================================================
    // HELPERS
    // ==================================================

    function value(id) {

        const element =
            document.getElementById(id);

        if (!element) return "";

        return element.value.trim();

    }


    function getValue(parent, selector) {

        const element =
            parent.querySelector(selector);

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


    function escapeHTML(text) {

        return String(text || "")
            .replaceAll("&", "&amp;