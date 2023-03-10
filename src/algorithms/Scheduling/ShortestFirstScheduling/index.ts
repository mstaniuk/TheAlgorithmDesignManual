import {Event} from '../types';


/**
 * Check if events are overlapping
 */
const areEventsOverlap = (a: Event, b: Event) =>
  (a.from < b.from && b.from < a.to) ||
  (a.from < b.to   && b.to   < a.to) ||
  (b.from <  a.from && a.to   <  b.to);

/**
 * Comparator for Events where the shortest completion date is first
 */
const compEvents = (a: Event, b: Event) => getEventLength(a.from, b.to) - getEventLength(a.from, a.to);

/**
 * Calculate event length
 */
const getEventLength = (start: Date, end: Date) => Number(start) - Number(end);

/**
 * Generates an Events schedules favouring the shortest event
 */
export function schedule(events: Event[]) {
  if (events.length <= 0) {
    return [];
  }

  // Sort events by their length
  let sortedEvents = events.sort(compEvents);

  // Prepare result array
  const result: Event[] = [];

  do {
    // Cache and add next shortest event as next result
    const lastResult = sortedEvents.shift()!;
    result.push(lastResult);

    // Remove events that are overlapping with last result
    sortedEvents = sortedEvents.filter((event) => !areEventsOverlap(lastResult, event));
  } while(sortedEvents.length > 0)

  return result;
}
