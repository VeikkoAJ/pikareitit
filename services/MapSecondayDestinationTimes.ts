import { Leg } from '../routeQueryTypes';

export type MappedItineraryLeg =
  | { mainQueryLeg: Leg; secondaryLegEndTime: number | undefined }
  | undefined;
/**
 * Combines the routeQuery results to a single array for displaying both arrival times in routeLeg
 * @param mainItineraryLegs
 * @param secondaryItineraryLegs
 */
export const MapSecondaryDestinationTimes = (
  mainItineraryLegs: (Leg | undefined)[],
  secondaryItineraryLegs: (Leg | undefined)[] | undefined
): MappedItineraryLeg[] =>
  mainItineraryLegs.map((mainLeg, i) => {
    if (mainLeg === undefined) {
      return undefined;
    }
    if (
      secondaryItineraryLegs === undefined ||
      secondaryItineraryLegs[i] === undefined ||
      secondaryItineraryLegs[i]?.endTime === undefined
    ) {
      return { mainQueryLeg: mainLeg, secondaryLegEndTime: undefined };
    }
    return {
      mainQueryLeg: mainLeg,
      secondaryLegEndTime: secondaryItineraryLegs[i]?.endTime,
    };
  });
