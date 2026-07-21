async function loadDashboard() {
  try {
    const students = await getDocs(collection(db, "students"));
    document.getElementById("studentCount").innerText = students.size;

    const classes = await getDocs(collection(db, "classes"));
    document.getElementById("classCount").innerText = classes.size;

    const events = await getDocs(collection(db, "events"));
    document.getElementById("eventCount").innerText = events.size;

    const notices = await getDocs(collection(db, "notices"));
    document.getElementById("noticeCount").innerText = notices.size;
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
window.location.href = "index.html";
}

loadDashboard();