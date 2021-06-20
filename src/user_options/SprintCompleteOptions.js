
/* Options for pop up menu when users productivity sprint is over
 * They will have the option to go for 5 or 10 more minutes or take their break
 */

module.exports = {
  type: 'question',
  buttons: ['5 more minutes', '10 more minutes', 'Okay', 'Exit'],
  defaultId: 2,
  title: 'Question',
  message: 'Stretch and relax',
  detail: "You've been productive, take a 5 minute break",
};
