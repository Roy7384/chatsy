const Call = require('../entities/Call');

let timerId;

const matchUsers = (activeUsers, lobby, io) => {

  const startMatching = () => {
    // check users under each interests
    Object.keys(lobby.usersByInterest).forEach(interest => {
      const usersHasInterest = lobby.usersByInterest[interest];

      // If that interest has more than 2 users
      if (usersHasInterest && usersHasInterest.size > 1) {
        const usersInCall = [];
        const usersHasInterestIter = usersHasInterest.values();
        // put those two users in a call
          
        const {value, done} = usersHasInterestIter.next();
        usersInCall.push(value);
        const userIdLookup = usersInCall[0];

        let shouldEndLoop = done;

        while ((usersInCall.length !== 2) && !shouldEndLoop) {
          const {value, done} = usersHasInterestIter.next();
          value && !lobby.haveUsersPreviouslyMatched(userIdLookup, value) && usersInCall.push(value);
          shouldEndLoop = done;
        }

        // use socket.io to send one user the other user's peerId to start call
        if (usersInCall.length === 2) {
          lobby.addMatch(usersInCall[0], usersInCall[1]);
          const pairedUserObjs = usersInCall.map(userId => activeUsers.getUserById(userId));
          const call = new Call(...pairedUserObjs);
          call.start(io);
  
          // remove the two users from lobby
          pairedUserObjs.forEach(user => {
            lobby.removeUser(user);
          });
        }
      }
    });
  };

  // if startMatching has been previously scheduled, do not call startMatching again
  if (timerId) return;
  
  // leading edge call
  startMatching();

  timerId = setTimeout(() => {
    // trailing edge call
    startMatching();
    timerId = null;
  }, 3000);

};

module.exports = matchUsers;
