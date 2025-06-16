// // utils/sendMailchimpResults.js
// import mailchimp from "@mailchimp/mailchimp_transactional";
// import "dotenv/config";

// const mailchimpClient = mailchimp(process.env.MAIL_CHIMP_API_KEY);

// const sendMailchimpResults = async ({ students, testId }) => {
//   const messages = students.map((student) => ({
//     to: [{ email: student.email, type: "to" }],
//     from_email: "rohit@fullstacklearning.com",
//     subject: "Your Test Result is Released!",
//     html: `
//       <p>Dear ${student.name},</p>
//       <p>Your test result has been released. Please login to view your score and responses.</p>
//       <p><strong>Test ID:</strong> ${testId}</p>
//       <br />
//       <p>Best Regards,<br />Admin Team</p>
//     `,
//   }));

//   const results = await mailchimpClient.messages.send({
//     message: messages, 
//   });

//   return results;
// };

// export default sendMailchimpResults;


import mailchimp from "@mailchimp/mailchimp_transactional";
import "dotenv/config";

const mailchimpClient = mailchimp(process.env.MAILCHIMP_TRANSACTIONAL_API_KEY);

const sendMailchimpResults = async ({ students, testId }) => {
  const results = [];

  for (const student of students) {
    const message = {
      to: [{ email: student.email, type: "to" }],
      from_email: "rohit@fullstacklearning.com",
      subject: "Your Test Result is Released!",
      html: `
        <p>Dear ${student.name},</p>
        <p>Your test result has been released. Please login to view your score and responses.</p>
        <p><strong>Test ID:</strong> ${testId}</p>
        <br />
        <p>Best Regards,<br />Admin Team</p>
      `,
    };

    try {
      const response = await mailchimpClient.messages.send({ message });
      results.push(response);
      console.log(`✅ Email sent to ${student.email}`, response);
    } catch (error) {
      console.error(`❌ Failed to send email to ${student.email}`, error);
    }
  }

  return results;
};

export default sendMailchimpResults;
