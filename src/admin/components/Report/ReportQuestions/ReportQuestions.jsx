import React from "react";

import styles from "./ReportQuestions.module.css";

export default function ReportQuestions({
  initialQuestions,
  appliances,
  appliancesInfoToString,
  capitalizeFirst
}) {
  return (
    <div className={styles.Questions}>
      <h4>Additional Unit Check</h4>
      <div className={styles.QuestionBlock}>
        <div className={styles.QuestionBlock_questions}>
          {/* general question */}
          {initialQuestions.map(question => {
            return (
              <div
                className={styles.QuestionBlock_questions__div}
                key={question.type}
              >
                <div>
                  <span>{capitalizeFirst(question.type)} </span>
                  {question.info.answer === ""
                    ? "Not selected"
                    : question.info.answer}
                </div>
                {/* comment span condition */}
                {!question.info.comment ? null : (
                  <div>
                    <span>Comment: </span>
                    {question.info.comment}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.QuestionBlock_appliances}>
          {/* appliances questions */}
          {appliances.map(appli => {
            return (
              <div key={appli.type}>
                <span>{capitalizeFirst(appli.type)}</span> <span></span>
                {appliancesInfoToString(appli.info)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
