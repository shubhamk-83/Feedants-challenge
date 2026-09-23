const getCompetitionStatus = (competition, now = new Date()) => {
  if (now < competition.registrationStart) {
    return "UPCOMING";
  }

  if (
    now >= competition.registrationStart &&
    now <= competition.registrationEnd
  ) {
    if (competition.participantsCount >= competition.maxParticipants) {
      return "FULL";
    }

    return "REGISTRATION_OPEN";
  }

  if (now < competition.submissionStart) {
    return "REGISTRATION_CLOSED";
  }

  if (now <= competition.submissionEnd) {
    return "SUBMISSION_OPEN";
  }

  if (now < competition.resultDate) {
    return "JUDGING";
  }

  return "COMPLETED";
};

module.exports = getCompetitionStatus;
