const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-west-2' });
const sesv2 = new AWS.SESV2({ apiVersion: '2019-09-27' });

const SES = {
  async sendActivationEmail(emailAddress, token) {
    console.log('Sending email to:', emailAddress, 'with token', token);
    const params = {
      Content: {
        Simple: {
          Subject: {
            Data: 'Tipper Verification Email',
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: `Follow this link to <b>complete</b> sign-in. <a href="https://tipper.seannyphoenix.com/home/magic-link?token=${token}">${token}</a>`,
            },
            Text: {
              Data: `Follow this link to complete sign-in. https://tipper.seannyphoenix.com/home/magic-link?token=${token}`,
            },
          },
        },
      },
      FromEmailAddress: 'test@seannyphoenix.com',
      Destination: {
        ToAddresses: [emailAddress],
      },
    };
    const result = await sesv2.sendEmail(params).promise();
    return result;
  },
};

module.exports = SES;
