import { describe, expect, test } from 'vitest'
import {Event} from '../types';
import {schedule} from './index';

describe('ShortestFirstScheduling', () => {
  test('schedules events in order of shortest to longest', () => {
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
        from: new Date('01-01-2022'),
        to: new Date('01-10-2022'),
      },
      {
        label: 'Event#2',
        from: new Date('01-07-2022'),
        to: new Date('01-21-2022'),
      },
      {
        label: 'Event#3',
        from: new Date('01-11-2022'),
        to: new Date('01-15-2022'),
      }
    ];

    const expectedOutputEvents: Event[] = [
      {
        label: 'Event#1',
        from: new Date('01-01-2022'),
        to: new Date('01-10-2022'),
      },
      {
        label: 'Event#3',
        from: new Date('01-11-2022'),
        to: new Date('01-15-2022'),
      }
    ];

    const result = schedule(events);

    expect(result).toEqual(expectedOutputEvents);
  });
})
