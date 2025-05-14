import sgMail from "@sendgrid/mail";
//rohit@fullstacklearning.com

export function sendAckEmail(newData) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: newData.email,
    // from: "rohit@fullstacklearning.com",
    from:"dheerajjangid013@gmail.com",
    subject: "Thank you for registering at Full Stack Learning",
    text: "Your registration is successful.",
    html: `<strong>Your registration is successful.</strong>
          <p>Your OneTime password is: <strong>${newData.password}</strong></p>
         `,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

export function sendDataByEmail(newData) {
  const getDayName = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const getMonthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dt = new Date();
  const day = getDayName[dt.getDay()];
  const date = dt.getDate();
  const month = getMonthName[dt.getMonth() + 1];
  const year = dt.getFullYear();
  const hour = dt.getHours();
  const min = dt.getMinutes();
  const output = `${day}, ${date}/${month}/${year} ${hour}::${min}`;

  try {
    let table =
      "<table class='table' border='1'><tr><th colspan='2'>New Registration on " +
      output +
      "</th></tr><tr><th colspan='2'>Student Details</th></tr><tr><th>Name</th><td>" +
      newData.name +
      "</td></tr><tr><th>D.O.B</th><td>" +
      newData.dob +
      "</td></tr><tr><th>Father's Name</th><td>" +
      newData.fname +
      "</td></tr><tr><th>Father's Phone</th><td>" +
      newData.fphone +
      "</td></tr><tr><th>Email</th><td>" +
      newData.email +
      "</td></tr><tr><th>Phone</th><td>" +
      newData.phone +
      "</td></tr><tr><th>Local Address</th><td>" +
      newData.laddress +
      "</td></tr><tr><th>Permanent Address</th><td>" +
      newData.paddress +
      "</td></tr>";
    if (newData.role === "student") {
      table +=
        "<tr><th>College</th><td>" +
        newData.college +
        "</td></tr><tr><th>Studying</th><td>" +
        newData.qualification +
        "</td></tr><tr><th>Batch</th><td>" +
        newData.qualificationYear +
        "</td></tr>";
    } else if (newData.role === "working") {
      table +=
        "<tr><th>Company</th><td>" +
        newData.company +
        "</td></tr><tr><th>Designation</th><td>" +
        newData.designation +
        "</td></tr>";
    }
    table +=
      "<tr><th>How you come to know about us?</th><td>" +
      newData.referral +
      "</td></tr>";
    if (newData.referral.toLowerCase() === "friend") {
      table +=
        "<tr><th>Friend's Name</th><td>" + newData.friendName + "</td></tr>";
    }
    table += "<tr><th>Course</th><td>" + newData.course + "</td></tr>";
    table +=
      "<tr><th>Custom Course</th><td>" + newData.otherCourse + "</td></tr>";
    table +=
      "<tr><th>Adhaar Front</th><td><img src='" +
      newData.aadharFront +
      "' width='100'></td></tr>";
    table +=
      "<tr><th>Adhaar Back</th><td><img src='" +
      newData.aadharBack +
      "' width='100'></td></tr>";
    table += "</table>";

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: "rohit@fullstacklearning.com",
      from: "rohit@fullstacklearning.com",
      subject: "New Registration at Full Stack Learning",
      html:
        "<strong>New Registration at Full Stack Learning at " +
        table +
        "</strong>",
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log(error);
  }
}
