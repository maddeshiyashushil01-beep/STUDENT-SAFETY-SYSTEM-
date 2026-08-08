document.addEventListener("DOMContentLoaded", function () {

    // ================================
    // BASIC HELPERS
    // ================================

    function val(id) {
        const el = document.getElementById(id);
        return el ? el.value.trim() : "";
    }

    function text(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    function safe(value) {
        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    // ================================
    // LIVE BASIC INFORMATION
    // ================================

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

    basicFields.forEach(function (id) {

        const el = document.getElementById(id);

        if (el) {
            el.addEventListener("input", updateResume);
        }

    });


    // ================================
    // ADD EDUCATION
    // ================================

    const addEducation =
        document.getElementById("addEducation");

    const educationContainer =
        document.getElementById("educationContainer");

    if (addEducation && educationContainer) {

        addEducation.addEventListener("click", function () {

            const item = document.createElement("div");

            item.className = "dynamic-item education-item";

            item.innerHTML = `
                <button type="button" class="remove-btn">
                    ✕ Remove
                </button>

                <div class="form-grid">

                    <div class="form-group">
                        <label>Degree / Course</label>
                        <input class="edu-degree"
                            placeholder="B.Tech in Electronics & Communication">
                    </div>

                    <div class="form-group">
                        <label>College / University</label>
                        <input class="edu-college"
                            placeholder="Government Engineering College">
                    </div>

                    <div class="form-group">
                        <label>Year</label>
                        <input class="edu-year"
                            placeholder="2024 - 2028">
                    </div>

                    <div class="form-group">
                        <label>CGPA / Percentage</label>
                        <input class="edu-score"
                            placeholder="8.5 CGPA">
                    </div>

                </div>
            `;

            educationContainer.appendChild(item);

            connectDynamicItem(item);

            updateResume();

        });

    }


    // ================================
    // ADD PROJECT
    // ================================

    const addProject =
        document.getElementById("addProject");

    const projectContainer =
        document.getElementById("projectContainer");

    if (addProject && projectContainer) {

        addProject.addEventListener("click", function () {

            const item = document.createElement("div");

            item.className = "dynamic-item project-item";

            item.innerHTML = `
                <button type="button" class="remove-btn">
                    ✕ Remove
                </button>

                <div class="form-group">
                    <label>Project Name</label>
                    <input class="project-name"
                        placeholder="Student Safety System">
                </div>

                <div class="form-group">
                    <label>Technologies</label>
                    <input class="project-tech"
                        placeholder="HTML, CSS, JavaScript, Firebase">
                </div>

                <div class="form-group">
                    <label>Project Link</label>
                    <input class="project-link"
                        placeholder="https://github.com/username/project">
                </div>

                <div class="form-group">
                    <label>Project Description</label>
                    <textarea class="project-description"
                        rows="4"
                        placeholder="Describe your project. Use a new line for each achievement."></textarea>
                </div>
            `;

            projectContainer.appendChild(item);

            connectDynamicItem(item);

            updateResume();

        });

    }


    // ================================
    // ADD EXPERIENCE
    // ================================

    const addExperience =
        document.getElementById("addExperience");

    const experienceContainer =
        document.getElementById("experienceContainer");

    if (addExperience && experienceContainer) {

        addExperience.addEventListener("click", function () {

            const item = document.createElement("div");

            item.className = "dynamic-item experience-item";

            item.innerHTML = `
                <button type="button" class="remove-btn">
                    ✕ Remove
                </button>

                <div class="form-grid">

                    <div class="form-group">
                        <label>Role</label>
                        <input class="exp-role"
                            placeholder="Software Developer Intern">
                    </div>

                    <div class="form-group">
                        <label>Company</label>
                        <input class="exp-company"
                            placeholder="Company Name">
                    </div>

                    <div class="form-group">
                        <label>Duration</label>
                        <input class="exp-duration"
                            placeholder="May 2026 - July 2026">
                    </div>

                </div>

                <div class="form-group">
                    <label>Responsibilities / Achievements</label>

                    <textarea class="exp-description"
                        rows="4"
                        placeholder="Write each achievement on a new line."></textarea>
                </div>
            `;

            experienceContainer.appendChild(item);

            connectDynamicItem(item);

            updateResume();

        });

    }


    // ================================
    // ADD CERTIFICATION
    // ================================

    const addCertification =
        document.getElementById("addCertification");

    const certificationContainer =
        document.getElementById("certificationContainer");

    if (addCertification && certificationContainer) {

        addCertification.addEventListener("click", function () {

            const item = document.createElement("div");

            item.className = "dynamic-item certification-item";

            item.innerHTML = `
                <button type="button" class="remove-btn">
                    ✕ Remove
                </button>

                <div class="form-grid">

                    <div class="form-group">
                        <label>Certification</label>
                        <input class="cert-name"
                            placeholder="Google Data Analytics">
                    </div>

                    <div class="form-group">
                        <label>Issuing Organization</label>
                        <input class="cert-org"
                            placeholder="Google">
                    </div>

                    <div class="form-group">
                        <label>Year</label>
                        <input class="cert-year"
                            placeholder="2026">
                    </div>

                </div>
            `;

            certificationContainer.appendChild(item);

            connectDynamicItem(item);

            updateResume();

        });

    }


    // ================================
    // DYNAMIC ITEM EVENTS
    // ================================

    function connectDynamicItem(item) {

        const remove =
            item.querySelector(".remove-btn");

        if (remove) {

            remove.addEventListener("click", function () {

                item.remove();

                updateResume();

            });

        }

        item
            .querySelectorAll("input, textarea")
            .forEach(function (input) {

                input.addEventListener(
                    "input",
                    updateResume
                );

            });

    }


    // ================================
    // UPDATE RESUME
    // ================================

    function updateResume() {

        // Personal
        text(
            "previewName",
            val("name") || "YOUR NAME"
        );

        const contact = [
            val("email"),
            val("phone"),
            val("location")
        ].filter(Boolean);

        text(
            "previewContact",
            contact.length
                ? contact.join(" • ")
                : "Email • Phone • Location"
        );

        const links = [
            val("linkedin"),
            val("github"),
            val("portfolio")
        ].filter(Boolean);

        text(
            "previewLinks",
            links.length
                ? links.join(" • ")
                : "LinkedIn • GitHub • Portfolio"
        );


        // Summary
        text(
            "previewSummary",
            val("summary") ||
            "Your professional summary will appear here."
        );


        updateEducation();
        updateSkills();
        updateProjects();
        updateExperience();
        updateCertifications();
        updateAchievements();

    }


    // ================================
    // EDUCATION PREVIEW
    // ================================

    function updateEducation() {

        const preview =
            document.getElementById("previewEducation");

        if (!preview) return;

        preview.innerHTML = "";

        document
            .querySelectorAll(".education-item")
            .forEach(function (item) {

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

                const div =
                    document.createElement("div");

                div.className = "resume-entry";

                div.innerHTML = `
                    <div class="resume-entry-header">
                        <strong>${safe(degree)}</strong>
                        <span>${safe(year)}</span>
                    </div>

                    <p>
                        ${safe(college)}
                        ${score ? " • " + safe(score) : ""}
                    </p>
                `;

                preview.appendChild(div);

            });

    }


    // ================================
    // SKILLS PREVIEW
    // ================================

    function updateSkills() {

        const preview =
            document.getElementById("previewSkills");

        if (!preview) return;

        preview.innerHTML = "";

        const skills = [
            ["Programming", val("programming")],
            ["Frameworks", val("frameworks")],
            ["Database / Cloud", val("database")],
            ["Tools", val("tools")]
        ];

        skills.forEach(function ([name, content]) {

            if (!content) return;

            const row =
                document.createElement("div");

            row.className = "skill-row";

            row.innerHTML = `
                <strong>${safe(name)}</strong>
                <span>${safe(content)}</span>
            `;

            preview.appendChild(row);

        });

    }


    // ================================
    // PROJECTS PREVIEW
    // ================================

    function updateProjects() {

        const preview =
            document.getElementById("previewProjects");

        if (!preview) return;

        preview.innerHTML = "";

        document
            .querySelectorAll(".project-item")
            .forEach(function (item) {

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

                const div =
                    document.createElement("div");

                div.className = "project-entry";

                let bullets = "";

                if (description) {

                    bullets = `
                        <ul>
                            ${description
                                .split("\n")
                                .filter(Boolean)
                                .map(line =>
                                    `<li>${safe(line)}</li>`
                                )
                                .join("")}
                        </ul>
                    `;

                }

                div.innerHTML = `
                    <strong>${safe(name)}</strong>

                    ${tech
                        ? `<div class="tech">${safe(tech)}</div>`
                        : ""}

                    ${link
                        ? `<div class="tech">${safe(link)}</div>`
                        : ""}

                    ${bullets}
                `;

                preview.appendChild(div);

            });

    }


    // ================================
    // EXPERIENCE PREVIEW
    // ================================

    function updateExperience() {

        const preview =
            document.getElementById("previewExperience");

        if (!preview) return;

        preview.innerHTML = "";

        document
            .querySelectorAll(".experience-item")
            .forEach(function (item) {

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

                const div =
                    document.createElement("div");

                div.className = "resume-entry";

                let bullets = "";

                if (description) {

                    bullets = `
                        <ul>
                            ${description
                                .split("\n")
                                .filter(Boolean)
                                .map(line =>
                                    `<li>${safe(line)}</li>`
                                )
                                .join("")}
                        </ul>
                    `;

                }

                div.innerHTML = `
                    <div class="resume-entry-header">
                        <strong>${safe(role)}</strong>
                        <span>${safe(duration)}</span>
                    </div>

                    <p>${safe(company)}</p>

                    ${bullets}
                `;

                preview.appendChild(div);

            });

    }


    // ================================
    // CERTIFICATIONS PREVIEW
    // ================================

    function updateCertifications() {

        const preview =
            document.getElementById("previewCertifications");

        if (!preview) return;

        preview.innerHTML = "";

        document
            .querySelectorAll(".certification-item")
            .forEach(function (item) {

                const name =
                    item.querySelector(".cert-name")?.value.trim() || "";

                const org =
                    item.querySelector(".cert-org")?.value.trim() || "";

                const year =
                    item.querySelector(".cert-year")?.value.trim() || "";

                if (!name && !org && !year) {
                    return;
                }

                const div =
                    document.createElement("div");

                div.className = "resume-entry";

                div.innerHTML = `
                    <div class="resume-entry-header">
                        <strong>${safe(name)}</strong>
                        <span>${safe(year)}</span>
                    </div>

                    <p>${safe(org)}</p>
                `;

                preview.appendChild(div);

            });

    }


    // ================================
    // ACHIEVEMENTS PREVIEW
    // ================================

    function updateAchievements() {

        const preview =
            document.getElementById("previewAchievements");

        if (!preview) return;

        preview.innerHTML = "";

        const achievements =
            val("achievements");

        if (!achievements) return;

        const ul =
            document.createElement("ul");

        achievements
            .split("\n")
            .filter(Boolean)
            .forEach(function (line) {

                const li =
                    document.createElement("li");

                li.textContent =
                    line.replace(/^[•\-*]\s*/, "");

                ul.appendChild(li);

            });

        preview.appendChild(ul);

    }


    // ================================
    // GENERATE RESUME
    // ================================

    const generateBtn =
        document.getElementById("generateBtn");

    if (generateBtn) {

        generateBtn.addEventListener("click", function () {

            updateResume();

            const preview =
                document.getElementById("resumePreview");

            if (preview) {

                preview.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

            generateBtn.textContent =
                "✅ Resume Generated";

            setTimeout(function () {

                generateBtn.textContent =
                    "✨ Generate Resume";

            }, 1500);

        });

    }


    // ================================
    // PRINT / SAVE PDF
    // ================================

    const downloadBtn =
        document.getElementById("downloadBtn");

    if (downloadBtn) {

        downloadBtn.addEventListener("click", function () {

            updateResume();

            window.print();

        });

    }


    // ================================
    // START
    // ================================

    updateResume();

    console.log("✅ Resume Builder ready");

});