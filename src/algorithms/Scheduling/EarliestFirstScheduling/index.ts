import {Event} from '../types';
/**
 * Comparator for Events where the earliest completion date is first
 */
const compEvents = (a: Event, b: Event) =>  Number(a.from) - Number(b.from);

/**
 * Generates an Events schedules favouring the Events starting first
 * Optimal scheduler
 */
export function schedule(events: Event[]): Event[] {
  if (events.length <= 0) {
    return [];
  }

  // Sort events by their start date
  const sortedEvents = events.sort(compEvents);

  // Prepare result array
  const result: Event[] = [sortedEvents[0]];
  let lastStartDate: Date = sortedEvents[0].to;

  // Start from the second element since the first one is already in results
  for(let i = 1; i < sortedEvents.length; i++) {
    const currentEvent = sortedEvents[i];

    // If current event intersects with the latest event
    // skip it
    if(currentEvent.from < lastStartDate) {
      continue;
    }

    // Add next earliest start date event
    // to the results list and cache last start date
    result.push(currentEvent);
    lastStartDate = currentEvent.from;
  }

  return result;
}
