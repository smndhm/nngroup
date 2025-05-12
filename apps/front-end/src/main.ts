import "@nngroup/styles/dist/styles.css";
import { defineCustomElements } from "@nngroup/components/loader";
import {
  getCoursesSchedule,
  courseSave,
  courseDelete,
} from "./services/courses-api";

defineCustomElements();

const nngCourseEnroll = document.querySelector(
  "nng-course-enroll",
) as HTMLNngCourseEnrollElement | null;

import("./mocks/browser").then(({ worker }) => {
  worker
    .start({
      serviceWorker: {
        url: "/nngroup/mockServiceWorker.js",
      },
    })
    .then(() => {
      getCoursesSchedule(1).then((response) => {
        if (nngCourseEnroll !== null) {
          nngCourseEnroll.courses = response;
        }
      });
    });
});

nngCourseEnroll?.addEventListener("save", ({ detail }) => {
  if (detail) {
    courseDelete(1).then(() => {
      nngCourseEnroll.removeAttribute("saved");
    });
  } else {
    courseSave(1).then(() => {
      nngCourseEnroll.setAttribute("saved", "");
    });
  }
});
