// ======================================================
// RESUME BUILDER - COMPLETE VERSION
// Works with your current resume.html
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("✅ Resume Builder JS loaded");

    // ==================================================
    // BASIC FIELD IDs
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


    // ==================================================
    // HELPER FUNCTIONS
    // ==================================================

    function getValue(id) {
        const element = document.getElementById(id);

        if (!element) return "";

        return element.value.trim();
    }


    function setText(id, text) {
        const element = document.getElementById(id);

        if (element) {
            element.textContent = text;
        }
    }


    function escapeHTML(text) {
        return String(text || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function addInputListener(container) {

        container
            .querySelectorAll("input, textarea")
            .forEach(input => {

                input.addEventListener(
                    "input",
                    updateResume
                );

            });
    }


    // ==================================================
    // LIVE UPDATE - BASIC FIELDS
    // ==================================================

    basicFields.forEach(id => {

        const element = document.getElementById(id);

        if (element) {

            element.addEventListener(
                "input",
                updateResume
            );

        }

    });


    // ==================================================
    // EDUCATION
    // ==================================================

    const educationContainer =
        document.getElementById("educationContainer");

    const addEducationBtn =
        document.getElementById("addEducation");


    if (addEducationBtn) {

        addEducationBtn.addEventListener("click", () => {

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

            item
                .querySelector(".remove-btn")
                .addEventListener("click", () => {

                    item.remove();

                    updateResume();

                });

            addInputListener(item);

            updateResume();

        });

    }


    // ==================================================
    // PROJECTS
    // ==================================================

    const projectContainer =
        document.getElementById("projectContainer");

    const addProjectBtn =
        document.getElementById("addProject");


    if (addProjectBtn) {

        addProjectBtn.addEventListener("click", () => {

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

                    <label>Project Description</label>

                    <textarea
                        class="project-description"
                        rows="4"
                        placeholder="Write each achievement on a new line."
                    ></textarea>

                </div>
            `;

            projectContainer.appendChild(item);

            item
                .querySelector(".remove-btn")
                .addEventListener("click", () => {

                    item.remove();

                    updateResume();

                });

            addInputListener(item);

            updateResume();

        });

    }


    // ==================================================
    // EXPERIENCE
    // ==================================================

    const experienceContainer =
        document.getElementById("experienceContainer");

    const addExperienceBtn =
        document.getElementById("addExperience");


    if (addExperienceBtn) {

        addExperienceBtn.addEventListener("click", () => {

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

                    <label>Responsibilities / Achievements</label>

                    <textarea
                        class="exp-description"
                        rows="4"
                        placeholder="Write each responsibility or achievement on a new line."
                    ></textarea>

                </div>
            `;

            experienceContainer.appendChild(item);

            item
                .querySelector(".remove-btn")
                .addEventListener("click", () => {

                    item.remove();

                    updateResume();

                });

            addInputListener(item);

            updateResume();

        });

    }


    // ==================================================
    // CERTIFICATIONS
    // ==================================================

    const certificationContainer =
        document.getElementById("certificationContainer");

    const addCertificationBtn =
        document.getElementById("addCertification");


    if (addCertificationBtn) {

        addCertificationBtn.addEventListener(
            "click",
            () => {

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
                                type="text"
                                class="cert-name"
                                placeholder="Google Data Analytics"
                            >

                        </div>

                        <div class="form-group">

                            <label>Issuing Organization</label>

                            <input
                                type="text"
                                class="cert-org"
                                placeholder="Google"
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

                item
                    .querySelector(".remove-btn")
                    .addEventListener("click", () => {

                        item.remove();

                        updateResume();

                    });

                addInputListener(item);

                updateResume();

            }
        );

    }


    // ==================================================
    // UPDATE COMPLETE RESUME
    // ==================================================

    function updateResume() {

        // ----------------------------------------------
        // PERSONAL INFORMATION
        // ----------------------------------------------

        setText(
            "previewName",
            getValue("name") || "YOUR NAME"
        );


        const contact = [

            getValue("email"),
            getValue("phone"),
            getValue("location")

        ].filter(Boolean);


        setText(
            "previewContact",
            contact.length
                ? contact.join(" • ")
                : "Email • Phone • Location"
        );


        const links = [

            getValue("linkedin"),
            getValue("github"),
            getValue("portfolio")

        ].filter(Boolean);


        setText(
            "previewLinks",
            links.length
                ? links.join(" • ")
                : "LinkedIn • GitHub • Portfolio"
        );


        // ----------------------------------------------
        // SUMMARY
        // ----------------------------------------------

        const summary =
            getValue("summary");


        setText(
            "previewSummary",
            summary ||
            "Your professional summary will appear here."
        );


        // ----------------------------------------------
        // OTHER SECTIONS
        // ----------------------------------------------

        updateEducation();

        updateSkills();

        updateProjects();

        updateExperience();

        updateCertifications();

        updateAchievements();

    }


    // ==================================================
    // EDUCATION PREVIEW
    // ==================================================

    function updateEducation() {

        const preview =
            document.getElementById("previewEducation");

        if (!preview) return;

        const items =
            document.querySelectorAll(".education-item");


        preview.innerHTML = "";


        items.forEach(item => {

            const degree =
                item.querySelector(".edu-degree")?.value.trim() || "";

            const college =
                item.querySelector(".edu-college")?.value.trim() || "";

            const year =
                item.querySelector(".edu-year")?.value.trim() || "";

            const score =
                item.querySelector(".edu-score")?.value.trim() || "";


            if (!degree && !college && !year && !score) {
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
                    ${score
                        ? " • " + escapeHTML(score)
                        : ""
                    }
                </p>

            `;


            preview.appendChild(entry);

        });

    }


    // ==================================================
    // SKILLS PREVIEW
    // ==================================================

    function updateSkills() {

        const preview =
            document.getElementById("previewSkills");

        if (!preview) return;


        const skills = [

            ["Programming", getValue("programming")],

            ["Frameworks", getValue("frameworks")],

            ["Database / Cloud", getValue("database")],

            ["Tools", getValue("tools")]

        ];


        preview.innerHTML = "";


        skills.forEach(([label, content]) => {

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

        });

    }


    // ==================================================
    // PROJECT PREVIEW
    // ==================================================

    function updateProjects() {

        const preview =
            document.getElementById("previewProjects");

        if (!preview) return;


        const items =
            document.querySelectorAll(".project-item");


        preview.innerHTML = "";


        items.forEach(item => {

            const name =
                item.querySelector(".project-name")?.value.trim() || "";

            const tech =
                item.querySelector(".project-tech")?.value.trim() || "";

            const link =
                item.querySelector(".project-link")?.value.trim() || "";

            const description =
                item.querySelector(".project-description")?.value.trim() || "";


            if (!name && !tech && !link && !description) {
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


                if (lines.length) {

                    bullets = `

                        <ul>

                            ${lines.map(line => `
                                <li>
                                    ${escapeHTML(line)}
                                </li>
                            `).join("")}

                        </ul>

                    `;

                }

            }


            entry.innerHTML = `

                <div class="resume-entry-header">

                    <strong>
                        ${escapeHTML(name)}
                    </strong>

                </div>

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
                        <div class="tech">
                            ${escapeHTML(link)}
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
    // EXPERIENCE PREVIEW
    // ==================================================

    function updateExperience() {

        const preview =
            document.getElementById("previewExperience");

        if (!preview) return;


        const items =
            document.querySelectorAll(".experience-item");


        preview.innerHTML = "";


        items.forEach(item => {

            const role =
                item.querySelector(".exp-role")?.value.trim() || "";

            const company =
                item.querySelector(".exp-company")?.value.trim() || "";

            const duration =
                item.querySelector(".exp-duration")?.value.trim() || "";

            const description =
                item.querySelector(".exp-description")?.value.trim() || "";


            if (!role && !company && !duration && !description) {
                return;
            }


            const entry =
                document.createElement("div");

            entry.className =
                "resume-entry";


            let descriptionHTML = "";


            if (description) {

                const lines =
                    description
                        .split("\n")
                        .map(line => line.trim())
                        .filter(Boolean);


                descriptionHTML = `

                    <ul>

                        ${lines.map(line => `
                            <li>
                                ${escapeHTML(line)}
                            </li>
                        `).join("")}

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

                ${descriptionHTML}

            `;


            preview.appendChild(entry);

        });

    }


    // ==================================================
    // CERTIFICATION PREVIEW
    // ==================================================

    function updateCertifications() {

        const preview =
            document.getElementById("previewCertifications");

        if (!preview) return;


        const items =
            document.querySelectorAll(".certification-item");


        preview.innerHTML = "";


        items.forEach(item => {

            const name =
                item.querySelector(".cert-name")?.value.trim() || "";

            const organization =
                item.querySelector(".cert-org")?.value.trim() || "";

            const year =
                item.querySelector(".cert-year")?.value.trim() || "";


            if (!name && !organization && !year) {
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
                            ${escapeHTML(organization)}
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
            document.getElementById("previewAchievements");

        if (!preview) return;


        const achievements =
            getValue("achievements");


        preview.innerHTML = "";


        if (!achievements) return;


        const lines =
            achievements
                .split("\n")
                .map(line => line.trim())
                .filter(Boolean);


        const ul =
            document.createElement("ul");


        lines.forEach(line => {

            const li =
                document.createElement("li");

            li.textContent =
                line.replace(/^[•\-*]\s*/, "");

            ul.appendChild(li);

        });


        preview.appendChild(ul);

    }


    // ==================================================
    // GENERATE RESUME BUTTON
    // ==================================================

    const generateBtn =
        document.getElementById("generateBtn");


    if (generateBtn) {

        generateBtn.addEventListener(
            "click",
            function () {

                console.log(
                    "✨ Generate Resume clicked"
                );


                updateResume();


                // Small visual feedback
                const oldText =
                    generateBtn.innerHTML;


                generateBtn.innerHTML =
                    "✅ Resume Generated!";


                setTimeout(() => {

                    generateBtn.innerHTML =
                        oldText;

                }, 1500);


                // Scroll to preview
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

            }
        );

    }


    // ==================================================
    // PRINT / SAVE PDF
    // ==================================================

    const downloadBtn =
        document.getElementById("downloadBtn");


    if (downloadBtn) {

        downloadBtn.addEventListener(
            "click",
            function () {

                console.log(
                    "🖨️ Print / Save PDF clicked"
                );


                updateResume();


                // Browser print dialog
                window.print();

            }
        );

    }


    // ==================================================
    // INITIAL UPDATE
    // ==================================================

    updateResume();


    console.log(
        "🚀 Resume Builder is ready!"
    );

});


document.addEventListener("DOMContentLoaded", function () {

    alert("Resume JavaScript is working!");

    const buttons = document.querySelectorAll("button");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            console.log("Clicked:", button.id || button.textContent);

        });

    });

});