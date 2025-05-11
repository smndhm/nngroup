import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'nng-course-enroll',
  styleUrls: ['nng-course-enroll.scss', '../../../node_modules/@nngroup/styles/dist/buttons.css'],
  shadow: true,
})
export class NngCourseEnroll {
  @Prop() courses: any = [];

  @Prop({ reflect: true }) saved: boolean = false;

  @Event({ eventName: 'save' }) save: EventEmitter<boolean>;

  @State() choosed: boolean = false;

  #handleSave = () => {
    this.save.emit(this.saved);
  };

  #handleChange = ({ target }) => {
    this.choosed = (target as HTMLFormElement).checkValidity();
  };

  render() {
    return (
      <form class="nng-course-enroll" onChange={this.#handleChange}>
        <fieldset>
          <caption>Course dates</caption>
          <ul role="list">
            {this.courses.map((course: unknown, index: number) => (
              <nng-course-card role="itemlist" course={course} required={index === 0}></nng-course-card>
            ))}
          </ul>
        </fieldset>
        <div class="nng-course-enroll__actions">
          <button class="nng-course-enroll__action-enroll nng-button nng-button--primary" disabled={!this.choosed}>
            Enroll in Course
          </button>
          <button
            class="nng-course-enroll__action-save nng-button nng-button--secondary"
            type="button"
            role="switch"
            aria-checked={this.saved.toString()}
            onClick={this.#handleSave}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill={!this.saved ? 'none' : undefined} xmlns="http://www.w3.org/2000/svg">
              {this.saved ? (
                <path
                  d="M6 5.25V25.8609C6 26.4891 6.51094 27 7.13906 27C7.37344 27 7.60312 26.9297 7.79531 26.7938L15 21.75L22.2047 26.7938C22.3969 26.9297 22.6266 27 22.8609 27C23.4891 27 24 26.4891 24 25.8609V5.25C24 4.00781 22.9922 3 21.75 3H8.25C7.00781 3 6 4.00781 6 5.25Z"
                  fill="#0073DD"
                />
              ) : (
                <path
                  d="M6 5.25C6 4.00781 7.00781 3 8.25 3V5.25V23.6906L14.3484 19.3359C14.7375 19.0547 15.2672 19.0547 15.6562 19.3359L21.75 23.6906V5.25H8.25V3H21.75C22.9922 3 24 4.00781 24 5.25V25.875C24 26.2969 23.7656 26.6812 23.3906 26.8734C23.0156 27.0656 22.5656 27.0328 22.2234 26.7891L15 21.6328L7.77656 26.7891C7.43438 27.0328 6.98438 27.0656 6.60938 26.8734C6.23438 26.6812 6 26.2969 6 25.875V5.25Z"
                  fill="#0073DD"
                />
              )}
            </svg>
            Save course
          </button>
        </div>
      </form>
    );
  }
}
