import sgMail from "@sendgrid/mail";
import "dotenv/config";

const LOGO_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

const TAILWIND_CDN = `<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">`;

function createAckEmailTemplate(password) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Successful - Full Stack Learning</title>
        ${TAILWIND_CDN}
        <style>
            .bg-gradient-primary {
                background: linear-gradient(135deg, #2E86AB 0%, #F24236 100%);
            }
            .text-primary { color: #2E86AB; }
            .text-secondary { color: #F24236; }
            .border-primary { border-color: #2E86AB; }
            .hover-lift:hover { transform: translateY(-2px); }
        </style>
    </head>
    <body class="bg-gray-100 font-sans">
        <div class="max-w-2xl mx-auto bg-white shadow-2xl">
            <!-- Header -->
            <div class="bg-gradient-primary text-white p-8 text-center">
                <div class="w-32 h-32 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <img src="cid:logo" alt="Full Stack Learning Logo" class="w-24 h-24 rounded-full" />
                </div>
                <h1 class="text-3xl font-light m-0">Welcome to Full Stack Learning</h1>
            </div>
            
            <!-- Content -->
            <div class="p-10">
                <!-- Welcome Message -->
                <div class="text-center mb-10">
                    <h2 class="text-primary text-2xl mb-3">🎉 Registration Successful!</h2>
                    <p class="text-gray-600 text-lg">Thank you for joining our learning community. Your journey to becoming a full-stack developer starts here!</p>
                </div>
                
                <!-- Password Card -->
                <div class="bg-gradient-primary text-white p-6 rounded-2xl text-center my-8 shadow-lg">
                    <h3 class="text-xl font-semibold mb-4 m-0">Your One-Time Password</h3>
                    <div class="text-4xl font-bold tracking-widest bg-white bg-opacity-20 py-4 px-6 rounded-xl inline-block my-3">
                        ${password}
                    </div>
                    <p class="text-sm opacity-90 mt-4 mb-0">Please keep this password secure and use it for your first login.</p>
                </div>
                
                <!-- Info Section -->
                <div class="bg-gray-50 p-6 rounded-xl my-8 border-l-4 border-primary">
                    <h4 class="text-primary text-lg mb-4 mt-0">What happens next?</h4>
                    <ul class="text-gray-600 space-y-2 pl-5">
                        <li>Check your email for course materials and schedule</li>
                        <li>Join our student community group</li>
                        <li>Complete your profile setup</li>
                        <li>Start your learning journey!</li>
                    </ul>
                </div>
                
                <!-- CTA Button -->
                <div class="text-center my-8">
                    <a href="#" class="inline-block bg-gradient-primary text-white py-4 px-8 rounded-full font-semibold text-lg no-underline transition-transform hover-lift shadow-lg">
                        Access Your Dashboard
                    </a>
                </div>
            </div>
            
            <!-- Footer -->
            <div class="bg-gray-800 text-white p-8 text-center">
                <p class="font-bold text-lg mb-2">Full Stack Learning</p>
                <p class="mb-5">Training & Development Excellence</p>
                <div class="my-5 space-x-4">
                    <a href="#" class="text-primary no-underline">Website</a>
                    <span class="text-gray-400">|</span>
                    <a href="#" class="text-primary no-underline">LinkedIn</a>
                    <span class="text-gray-400">|</span>
                    <a href="#" class="text-primary no-underline">Facebook</a>
                </div>
                <p class="text-sm mb-1">© 2024 Full Stack Learning. All rights reserved.</p>
                <p class="text-sm">Email: rohit@fullstacklearning.com</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

// Enhanced registration notification email template with Tailwind CSS
function createRegistrationEmailTemplate(newData, timestamp) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Registration - Full Stack Learning</title>
        ${TAILWIND_CDN}
        <style>
            .bg-gradient-primary {
                background: linear-gradient(135deg, #2E86AB 0%, #F24236 100%);
            }
            .text-primary { color: #2E86AB; }
            .text-secondary { color: #F24236; }
            .border-primary { border-color: #2E86AB; }
            .border-t-primary { border-top-color: #2E86AB; }
        </style>
    </head>
    <body class="bg-gray-100 font-sans">
        <div class="max-w-4xl mx-auto bg-white shadow-2xl">
            <!-- Header -->
            <div class="bg-gradient-primary text-white p-6 text-center">
                <div class="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                    <img src="cid:logo" alt="Full Stack Learning Logo" class="w-16 h-16 rounded-full" />
                </div>
                <h1 class="text-2xl font-light m-0">🎓 New Student Registration</h1>
                <div class="bg-white bg-opacity-20 py-2 px-5 rounded-full inline-block mt-3 text-sm">
                    ${timestamp}
                </div>
            </div>
            
            <!-- Content -->
            <div class="p-8">
                <!-- Student Card -->
                <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border-l-4 border-primary">
                    <div class="text-2xl font-semibold text-primary mb-2">👨‍🎓 ${newData.name}</div>
                    <div class="text-lg text-secondary mb-3">📧 ${newData.email}</div>
                    <div class="text-gray-600">📱 ${newData.phone}</div>
                </div>
                
                <!-- Course Highlight -->
                <div class="bg-gradient-primary text-white p-6 rounded-2xl text-center my-6">
                    <h3 class="text-xl mb-3 mt-0">📚 Enrolled Course</h3>
                    <div class="text-2xl font-bold mb-2">${newData.course}</div>
                    ${newData.otherCourse ? `<div class="text-base opacity-90">Custom: ${newData.otherCourse}</div>` : ''}
                </div>
                
                <!-- Details Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <!-- Personal Information -->
                    <div class="bg-white rounded-xl p-5 shadow-md border-t-4 border-t-primary">
                        <h3 class="text-primary text-lg mb-4 mt-0 flex items-center">
                            📋 Personal Information
                        </h3>
                        <div class="space-y-3">
                            <div class="flex justify-between items-center py-2 border-b border-gray-100">
                                <span class="font-semibold text-gray-600 min-w-max">Date of Birth:</span>
                                <span class="text-gray-800 ml-4">${newData.dob}</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-gray-100">
                                <span class="font-semibold text-gray-600 min-w-max">Father's Name:</span>
                                <span class="text-gray-800 ml-4">${newData.fname}</span>
                            </div>
                            <div class="flex justify-between items-center py-2">
                                <span class="font-semibold text-gray-600 min-w-max">Father's Phone:</span>
                                <span class="text-gray-800 ml-4">${newData.fphone}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Address Information -->
                    <div class="bg-white rounded-xl p-5 shadow-md border-t-4 border-t-primary">
                        <h3 class="text-primary text-lg mb-4 mt-0 flex items-center">
                            🏠 Address Information
                        </h3>
                        <div class="space-y-3">
                            <div class="flex justify-between items-start py-2 border-b border-gray-100">
                                <span class="font-semibold text-gray-600 min-w-max">Local Address:</span>
                                <span class="text-gray-800 ml-4 text-right">${newData.laddress}</span>
                            </div>
                            <div class="flex justify-between items-start py-2">
                                <span class="font-semibold text-gray-600 min-w-max">Permanent Address:</span>
                                <span class="text-gray-800 ml-4 text-right">${newData.paddress}</span>
                            </div>
                        </div>
                    </div>
                    
                    ${newData.role === 'student' ? `
                    <!-- Academic Information -->
                    <div class="bg-white rounded-xl p-5 shadow-md border-t-4 border-t-primary">
                        <h3 class="text-primary text-lg mb-4 mt-0 flex items-center">
                            🎓 Academic Information
                        </h3>
                        <div class="space-y-3">
                            <div class="flex justify-between items-center py-2 border-b border-gray-100">
                                <span class="font-semibold text-gray-600 min-w-max">College:</span>
                                <span class="text-gray-800 ml-4">${newData.college}</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-gray-100">
                                <span class="font-semibold text-gray-600 min-w-max">Studying:</span>
                                <span class="text-gray-800 ml-4">${newData.qualification}</span>
                            </div>
                            <div class="flex justify-between items-center py-2">
                                <span class="font-semibold text-gray-600 min-w-max">Batch:</span>
                                <span class="text-gray-800 ml-4">${newData.qualificationYear}</span>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    
                    ${newData.role === 'working' ? `
                    <!-- Professional Information -->
                    <div class="bg-white rounded-xl p-5 shadow-md border-t-4 border-t-primary">
                        <h3 class="text-primary text-lg mb-4 mt-0 flex items-center">
                            💼 Professional Information
                        </h3>
                        <div class="space-y-3">
                            <div class="flex justify-between items-center py-2 border-b border-gray-100">
                                <span class="font-semibold text-gray-600 min-w-max">Company:</span>
                                <span class="text-gray-800 ml-4">${newData.company}</span>
                            </div>
                            <div class="flex justify-between items-center py-2">
                                <span class="font-semibold text-gray-600 min-w-max">Designation:</span>
                                <span class="text-gray-800 ml-4">${newData.designation}</span>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    
                    <!-- Referral Information -->
                    <div class="bg-white rounded-xl p-5 shadow-md border-t-4 border-t-primary">
                        <h3 class="text-primary text-lg mb-4 mt-0 flex items-center">
                            🤝 Referral Information
                        </h3>
                        <div class="space-y-3">
                            <div class="flex justify-between items-center py-2 ${newData.referral.toLowerCase() === 'friend' ? 'border-b border-gray-100' : ''}">
                                <span class="font-semibold text-gray-600 min-w-max">How did you know:</span>
                                <span class="text-gray-800 ml-4">${newData.referral}</span>
                            </div>
                            ${newData.referral.toLowerCase() === 'friend' ? `
                            <div class="flex justify-between items-center py-2">
                                <span class="font-semibold text-gray-600 min-w-max">Friend's Name:</span>
                                <span class="text-gray-800 ml-4">${newData.friendName}</span>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
                
                <!-- Document Section -->
                <div class="bg-gray-50 p-6 rounded-xl my-6">
                    <h3 class="text-primary text-lg mb-4 mt-0">📄 Uploaded Documents</h3>
                    <div class="flex flex-wrap justify-center gap-6">
                        <div class="border-4 border-primary rounded-xl p-2 bg-white">
                            <img src="${newData.aadharFront}" alt="Aadhar Front" class="w-40 h-auto rounded-lg" />
                            <div class="text-center mt-2 text-sm text-gray-600">Aadhar Front</div>
                        </div>
                        <div class="border-4 border-primary rounded-xl p-2 bg-white">
                            <img src="${newData.aadharBack}" alt="Aadhar Back" class="w-40 h-auto rounded-lg" />
                            <div class="text-center mt-2 text-sm text-gray-600">Aadhar Back</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Footer -->
            <div class="bg-gray-800 text-white p-6 text-center">
                <p class="font-bold mb-2">Full Stack Learning - Training & Development</p>
                <p class="text-sm mb-1">© 2024 Full Stack Learning. All rights reserved.</p>
                <p class="text-sm">Email: rohit@fullstacklearning.com</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

export function sendResultEmail(student, testId) {
  return `
    <html>
      <body>
        <p>Dear ${student.name},</p>
        <p>Your test result has been released. Please log in to view your score and responses.</p>
        <p><strong>Test ID:</strong> ${testId}</p>
        <br />
        <p>Best regards,<br />Admin Team</p>
      </body>
    </html>
  `;
}


export function sendAckEmail(newData) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  const msg = {
    to: newData.email,
    from: "rohit@fullstacklearning.com",
    subject: "🎉 Welcome to Full Stack Learning - Registration Successful!",
    html: createAckEmailTemplate(newData.password),
    attachments: [
      {
        filename: "logo.png",
        content: LOGO_BASE64.split(',')[1], // Remove data:image/png;base64, part
        type: "image/png",
        disposition: "inline",
        content_id: "logo"
      }
    ]
  };
  
  console.log(newData.email);
  sgMail
    .send(msg)
    .then(() => {
      console.log("Enhanced acknowledgment email sent successfully");
    })
    .catch((error) => {
      console.error("Error sending acknowledgment email:", error);
    });
}

export function sendDataByEmail(newData) {
  const getDayName = [
    "Monday", "Tuesday", "Wednesday", "Thursday", 
    "Friday", "Saturday", "Sunday"
  ];
  const getMonthName = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dt = new Date();
  const day = getDayName[dt.getDay()];
  const date = dt.getDate();
  const month = getMonthName[dt.getMonth()];
  const year = dt.getFullYear();
  const hour = dt.getHours();
  const min = dt.getMinutes();
  const timestamp = `${day}, ${date} ${month} ${year} at ${hour}:${min.toString().padStart(2, '0')}`;

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: "rohit@fullstacklearning.com",
      from: "rohit@fullstacklearning.com",
      subject: "🎓 New Student Registration - Full Stack Learning",
      html: createRegistrationEmailTemplate(newData, timestamp),
      attachments: [
        {
          filename: "logo.png",
          content: LOGO_BASE64.split(',')[1], // Remove data:image/png;base64, part
          type: "image/png",
          disposition: "inline",
          content_id: "logo"
        }
      ]
    };
    
    sgMail
      .send(msg)
      .then(() => {
        console.log("Enhanced registration notification email sent successfully");
      })
      .catch((error) => {
        console.error("Error sending registration notification email:", error);
      });
  } catch (error) {
    console.log("Error in sendDataByEmail:", error);
  }
}


const sendSendgridResults = async ({ students, testId }) => {
  const results = [];

  for (const student of students) {
    const htmlContent = sendResultEmail(student, testId);

    const msg = {
      to: student.email,
      from: "rohit@fullstacklearning.com",
      subject: "📢 Your Test Result is Released!",
      html: htmlContent,
      attachments: [
        {
          filename: "logo.png",
          content: LOGO_BASE64.split(",")[1], // Strip base64 prefix
          type: "image/png",
          disposition: "inline",
          content_id: "logo",
        },
      ],
    };

    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const response = await sgMail.send(msg);
      results.push({ email: student.email, status: "sent", response });
      console.log(`Email sent to ${student.email}`);
    } catch (error) {
      console.error(
        `Failed to send email to ${student.email}`,
        error.response?.body || error.message
      );
      results.push({
        email: student.email,
        status: "failed",
        error: error.response?.body || error.message,
      });
    }
  }

  return results;
};
export default sendSendgridResults;