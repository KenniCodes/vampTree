class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let generations = 0;
    let vampire = this;

    while (vampire.creator) {
      vampire = vampire.creator;
      generations++;
    }
    return generations;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    let descendant = this;
    let ancestors = 0;
    while (descendant.creator) {
      ancestors++;
      descendant = descendant.creator;
    }
  
    descendant = vampire;
    let otherDescendantAncestors = 0;
    while (descendant.creator) {
      otherDescendantAncestors++;
      descendant = descendant.creator;
    }
  
    return ancestors < otherDescendantAncestors;
  }
  
  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }

    for (const child of this.offspring) {
      const found = child.vampireWithName(name);
      if (found) {
        return found;
      }
    }
    return null;
  }
  
  // Returns the total number of vampires that exist
  get totalDescendents() {
    let descendants = 0
    for (const child of this.offspring) {
        descendants += 1 + child.totalDescendents;
    }
    return descendants;
  }
  
  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenialVamps = [];

    if (this.yearConverted > 1980) {
      millenialVamps.push(this);
    }

    for (const child of this.offspring) {
      millenialVamps = millenialVamps.concat(child.allMillennialVampires);
    }
    return millenialVamps;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  // closestCommonAncestor(vampire) {

  // }
}

module.exports = Vampire;