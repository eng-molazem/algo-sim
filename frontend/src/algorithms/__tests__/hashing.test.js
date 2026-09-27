import { describe, it, expect } from 'vitest';
import hashChaining from '../hashing/hashChaining';
import hashLinearProbing from '../hashing/hashLinearProbing';

describe('hashChaining', () => {
  it('places each value at index = value % 7', () => {
    const snapshots = hashChaining.run([10, 3, 17]);
    const final = snapshots[snapshots.length - 1];
    expect(final.buckets[3]).toContain(10); // 10 % 7 = 3
    expect(final.buckets[3]).toContain(3); // 3 % 7 = 3
    expect(final.buckets[3]).toContain(17); // 17 % 7 = 3
  });

  it('flags a collision when a bucket already has an entry', () => {
    const snapshots = hashChaining.run([7, 14]); // both hash to index 0
    const collisionSnapshot = snapshots.find((s) => s.tag === 'collision');
    expect(collisionSnapshot).toBeDefined();
    expect(collisionSnapshot.activeIndex).toBe(0);
  });

  it('never drops a value even with many collisions', () => {
    const values = [1, 8, 15, 22, 29];
    const snapshots = hashChaining.run(values);
    const final = snapshots[snapshots.length - 1];
    const allInBuckets = final.buckets.flat();
    values.forEach((v) => expect(allInBuckets).toContain(v));
  });
});

describe('hashLinearProbing', () => {
  it('places a value at its hashed index when free', () => {
    const snapshots = hashLinearProbing.run([10]);
    const final = snapshots[snapshots.length - 1];
    expect(final.buckets[3]).toBe(10); // 10 % 7 = 3
  });

  it('probes to the next free slot on collision', () => {
    const snapshots = hashLinearProbing.run([7, 14]); // both hash to index 0
    const final = snapshots[snapshots.length - 1];
    expect(final.buckets[0]).toBe(7);
    expect(final.buckets[1]).toBe(14); // probed forward to the next open slot
  });

  it('reports the table as full once every slot is occupied', () => {
    const snapshots = hashLinearProbing.run([0, 1, 2, 3, 4, 5, 6, 7]); // 8 values, table size 7
    const fullSnapshot = snapshots.find((s) => s.tag === 'full');
    expect(fullSnapshot).toBeDefined();
  });
});
