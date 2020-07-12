const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-west-2' });
const sesv2 = new AWS.SESV2({ apiVersion: '2019-09-27' });

function createMagicLinkEmail(token) {
  const html = `Follow this link to complete sign-in. <a href="https://tipper.seannyphoenix.com/home/magic-link?token=${token}">${token}</a>`;
  const text = `Follow this link to complete sign-in. https://tipper.seannyphoenix.com/home/magic-link?token=${token}`;
  return [html, text];
}

const SES = {
  async sendActivationEmail(emailAddress, token) {
    const [html, text] = createMagicLinkEmail(token);
    console.log(html);
    const params = {
      Content: {
        Simple: {
          Subject: {
            Data: 'Tipper Verification Email',
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: html,
            },
            Text: {
              Data: text,
            },
          },
        },
      },
      FromEmailAddress: 'magic-link@seannyphoenix.com',
      Destination: {
        ToAddresses: [emailAddress],
      },
    };
    const result = await sesv2.sendEmail(params).promise();
    return result;
  },
};

module.exports = SES;
