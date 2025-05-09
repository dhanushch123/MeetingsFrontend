import React from 'react';
import { startOfYear, endOfYear, endOfMonth, format, addMonths } from 'date-fns';
import styles from './Yearview.module.css';

const Yearview = ({ date, events }) => {
  const start = startOfYear(date);
  const months = Array.from({ length: 12 }, (_, i) => addMonths(start, i));

  return (
    <div className={styles.container}>
      {months.map((monthStart, index) => {
        const monthEnd = endOfMonth(monthStart);
        const monthEvents = events.filter(
          (event) => event.start >= monthStart && event.start <= monthEnd
        );

        return (
          <div key={index} className={styles.monthBox}>
            <h4 className={styles.monthTitle}>
              {format(monthStart, 'MMMM yyyy')}
            </h4>
            {monthEvents.length === 0 ? (
              <div className={styles.noEvents}>No events</div>
            ) : (
                monthEvents.map((event, i) => {
                    const eventClass =
                      event.status === 'accepted'
                        ? styles.accepted
                        : event.status === 'rejected'
                        ? styles.rejected
                        : styles.past
                  
                    return (
                      <div key={i} className={eventClass}>
                        <b className={styles.date}>{format(event.start, 'dd')}</b>: {event.title}
                      </div>
                    );
                  })
            )}
          </div>
        );
      })}
    </div>
  );
};

Yearview.title = (date, { localizer }) => {
  return `Year: ${localizer.format(date, 'yyyy')}`;
};

Yearview.navigate = (date, action) => {
  const year = date.getFullYear();
  if (action === 'PREV') return new Date(year - 1, 0, 1);
  if (action === 'NEXT') return new Date(year + 1, 0, 1);
  return new Date(year, 0, 1);
};

Yearview.range = (date) => {
  return [startOfYear(date), endOfYear(date)];
};

export default Yearview;
