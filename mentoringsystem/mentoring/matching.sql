CREATE OR REPLACE FUNCTION get_overlap(mentorID BIGINT, menteeID BIGINT)
RETURNS INT 
LANGUAGE plpgsql
AS
$$
DECLARE
	overlap INTEGER;
BEGIN
    SELECT COUNT(*) INTO overlap FROM
    ((SELECT skill_id FROM mentoring_mentorskill WHERE mentoring_mentorskill.mentor_id = mentorID)
        INTERSECT
    (SELECT skill_id FROM mentoring_menteeinterest WHERE mentoring_menteeinterest.mentee_id = menteeID)) intersection;
    RETURN overlap;
END;
$$;

CREATE OR REPLACE FUNCTION get_average_feedback(mentorID BIGINT)
RETURNS NUMERIC(3,2)
LANGUAGE plpgsql
AS $$
DECLARE
	averageRating NUMERIC(3,2);
BEGIN
	SELECT COALESCE(AVG(rating), 0.00) INTO averageRating FROM mentoring_meetingfeedback JOIN mentoring_meeting ON mentoring_meeting.id = mentoring_meetingfeedback.meeting_id JOIN mentoring_relationship ON mentoring_relationship.id = mentoring_meeting.relationship_id WHERE mentoring_meetingfeedback.user_id != mentorID AND mentoring_relationship.mentor_id = mentorID;
	RETURN averageRating;
END;
$$;

CREATE OR REPLACE FUNCTION get_no_mentees(mentorID BIGINT)
RETURNS INT
LANGUAGE plpgsql
AS
$$
DECLARE
	noMentees INTEGER;
BEGIN
SELECT COUNT(*) INTO noMentees FROM mentoring_relationship WHERE mentoring_relationship.mentor_id = mentorID AND active_status = ‘A’ AND “group” = false;
	RETURN noMentees;
END;
$$;

