import { describe, expect, test } from 'vitest'
import {Event, schedule} from './index';

describe('OptimalScheduling', () => {
  test('schedules events in correct order', () => {
    const events: Event[] = [
      {
        label: 'Event#2',
        from: new Date('03-02-2022'),
        to: new Date('04-01-2022'),
      },
      {
        label: 'Event#1',
        from: new Date('02-01-2022'),
        to: new Date('03-01-2022'),
      }
    ];

    const expectedOutputEvents: Event[] = [
      {
        label: 'Event#1',
        from: new Date('02-01-2022'),
        to: new Date('03-01-2022'),
      },
      {
        label: 'Event#2',
        from: new Date('03-02-2022'),
        to: new Date('04-01-2022'),
      }
    ];

    const result = schedule(events);

    expect(result).toEqual(expectedOutputEvents);
  });

  test('skips overlapping events', () => {
    const events: Event[] = [
      {
        label: 'Event#1',
        from: new Date('02-01-2022'),
        to: new Date('03-01-2022'),
      },
      {
        label: 'Event#2',
        from: new Date('02-24-2022'),
        to: new Date('03-02-2022'),
      },
      {
        label: 'Event#3',
        from: new Date('03-03-2022'),
        to: new Date('04-01-2022'),
      }
    ];

    const expectedOutputEvents: Event[] = [
      {
        label: 'Event#1',
        from: new Date('02-01-2022'),
        to: new Date('03-01-2022'),
      },
      {
        label: 'Event#3',
        from: new Date('03-03-2022'),
        to: new Date('04-01-2022'),
      }
    ];

    const result = schedule(events);

    expect(result).toEqual(expectedOutputEvents);
  });
})
