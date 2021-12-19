"use strict";

function calc() {
	const scanners = input.split('\n\n').map(s => 
		s.split('\n').slice(1).map(e => e.match(/-?\d+/g).map(Number)));

	const Rs = getRotationMatrixs();

	const corrected = [];
	corrected.push(scanners[0]);
	scanners.splice(0, 1);

	const scannerCoords = [[0, 0, 0]];

	const queue = [corrected[0]];

	while (scanners.length > 0 && queue.length > 0) {
		const base = queue.shift();

		for (let i = 0; i < scanners.length; ++i) {
			const result = getOverlapped(base, scanners[i], Rs);
			if (result) {
				const [x, y, z, scanner] = result;
				corrected.push(scanner);
				scannerCoords.push([x, y, z]);
				queue.push(scanner);
				scanners.splice(i, 1);
				--i;
			}
		}
	}

	const beacons = new Set();

	corrected.forEach(s => s.forEach(xyz => beacons.add(xyz.join(','))));

	const part1 = beacons.size;

	let maxDist = 0;

	for (let i = 0; i < scannerCoords.length - 1; ++i) {
		for (let j = i + 1; j < scannerCoords.length; ++j) {
			maxDist = Math.max(maxDist, 
				Math.abs(scannerCoords[i][0] - scannerCoords[j][0]) +
				Math.abs(scannerCoords[i][1] - scannerCoords[j][1]) +
				Math.abs(scannerCoords[i][2] - scannerCoords[j][2]));
		}
	}

	const part2 = maxDist;

	return part1 + ' ' + part2;
}

function getOverlapped(base, candidate, Rs) {
	for (let ri = 0; ri < Rs.length; ++ri) {
		const rotated = rotateAll(candidate, Rs[ri]);

		for (let i = 0; i < base.length; ++i) {
			for (let j = 0; j < rotated.length; ++j) {
				const dx = base[i][0] - rotated[j][0];
				const dy = base[i][1] - rotated[j][1];
				const dz = base[i][2] - rotated[j][2];

				const moved = rotated.map(([x, y, z]) =>
					[x + dx, y + dy, z + dz]);

				const overlapped = moved.filter(([x, y, z]) =>
					base.find(([xb, yb, zb]) => xb == x && yb == y && zb == z));

				if (overlapped.length >= 12) {
					return [dx, dy, dz, moved];
				}
			}
		}
	}

	return null;
}

function getRotationMatrixs() {
	const set = new Set();
	const res = [];
	const cos = [1, 0, -1, 0];
	const sin = [0, 1, 0, -1];

	for (let a = 0; a < 4; ++a) {
		for (let b = 0; b < 4; ++b) {
			for (let c = 0; c < 4; ++c) {
				const ca = cos[a];
				const sa = sin[a];
				const cb = cos[b];
				const sb = sin[b];
				const cc = cos[c];
				const sc = sin[c];

				const m = [];
				m.push([ca * cb, ca * sb * sc - sa * cc, ca * sb * cc + sa * sc]);
				m.push([sa * cb, sa * sb * sc + ca * cc, sa * sb * cc - ca * sc]);
				m.push([-sb, cb * sc, cb * cc]);
				
				const s = m.flatMap(e => e).join(',');

				if (!set.has(s)) {
					res.push(m);
					set.add(s);
				}
			}
		}
	}

	return res;
}

function rotateAll(xyzs, r) {
	return xyzs.map(xyz => rotate(xyz, r));
}

function rotate(xyz, r) {
	return [
		r[0][0] * xyz[0] + r[0][1] * xyz[1] + r[0][2] * xyz[2],
		r[1][0] * xyz[0] + r[1][1] * xyz[1] + r[1][2] * xyz[2],
		r[2][0] * xyz[0] + r[2][1] * xyz[1] + r[2][2] * xyz[2]
	];
}

const input = `--- scanner 0 ---
-535,-526,-765
627,-311,420
-587,-471,242
581,-596,-710
-602,794,452
-716,825,-607
487,760,-636
-620,-456,271
-37,-16,-1
-647,-543,-606
608,-713,-821
-657,903,537
-667,-557,-727
670,-310,354
-672,-675,243
536,888,514
549,-605,-861
644,831,538
599,-378,391
-641,962,-643
133,68,-113
516,800,-553
582,762,538
-710,842,-633
568,907,-594
-549,867,508

--- scanner 1 ---
456,-531,375
-576,842,-474
610,385,-866
-834,-556,-713
-643,671,-468
-762,-584,448
682,-362,-794
-514,568,445
646,585,578
-886,-519,461
459,-646,390
-719,819,-521
517,-589,317
499,-382,-859
-760,-651,-763
-103,-42,-119
660,530,565
461,449,-781
-524,564,727
446,497,576
-800,-587,481
456,358,-860
-18,68,-9
609,-398,-871
-796,-580,-574
-490,612,654

--- scanner 2 ---
472,403,682
241,-583,724
-675,357,-564
-669,378,521
-613,451,574
-608,-750,432
676,-520,-952
-699,483,-610
-422,-411,-781
482,283,613
-412,-354,-725
619,-461,-890
-602,-745,585
392,445,-544
803,-486,-963
-698,342,629
-124,40,-32
446,420,688
322,-564,719
-436,-449,-565
433,338,-596
-699,414,-672
300,-486,706
-621,-681,516
475,485,-515
-14,-81,-129

--- scanner 3 ---
-657,-678,460
509,-860,-656
-401,-632,-610
-549,-710,546
767,-464,771
379,775,-813
387,525,-780
730,-541,714
468,458,866
418,-783,-546
-620,-759,379
475,395,803
-25,-35,83
-295,834,-674
-432,724,517
-463,-611,-487
-435,766,-751
449,558,765
-549,-554,-589
-417,648,492
377,-823,-696
507,642,-807
-313,727,-816
787,-458,664
-313,582,508

--- scanner 4 ---
-975,452,-498
317,632,-820
-738,-476,296
-939,-527,-429
458,519,739
774,-515,-893
817,-715,-874
476,-731,558
-690,-442,369
-772,708,458
-960,-659,-463
529,-804,502
-934,341,-453
-805,494,447
491,534,768
406,738,767
-859,-576,-415
-799,399,-512
649,-645,-891
-93,-61,-123
-717,694,445
421,-840,473
442,716,-804
247,701,-785
-734,-466,578

--- scanner 5 ---
127,-40,150
-499,-631,677
40,38,-15
760,726,921
-502,593,-452
-386,-724,-812
-270,-650,-808
-522,-542,641
543,730,-676
-563,557,445
-407,666,-490
821,704,899
720,-655,821
-453,747,-389
428,-372,-780
-577,-635,515
827,-770,759
-723,466,458
926,674,906
594,666,-556
497,-402,-766
-320,-660,-679
551,721,-473
849,-608,823
597,-415,-726
-629,444,411

--- scanner 6 ---
-448,-863,770
507,-372,-525
679,509,-466
658,447,-589
832,-741,685
736,595,-568
-710,-496,-403
-452,538,-624
612,703,481
-847,-455,-418
-388,855,950
580,595,567
-607,-841,733
-552,819,958
430,-463,-635
-40,-27,141
-588,-892,644
-420,592,-641
-372,551,-688
-522,862,841
467,-331,-675
-849,-493,-544
826,-721,792
749,-684,735
531,666,400

--- scanner 7 ---
-736,638,-635
694,-874,-538
694,-419,546
-565,-925,650
572,740,-916
792,601,779
669,722,-857
810,526,860
782,447,753
-50,-145,6
-730,584,747
635,-936,-481
591,735,-835
735,-419,458
-664,-884,742
-557,-911,759
-733,655,-704
-773,717,679
-762,693,713
-756,-697,-643
-719,679,-456
669,-947,-354
-705,-617,-569
691,-538,591
-179,-24,-80
-870,-714,-576

--- scanner 8 ---
620,-611,-583
-57,-86,-120
-826,-510,-686
-776,-492,-631
713,447,404
671,372,486
-544,426,566
-433,238,-835
685,379,476
379,-699,509
614,-764,-578
400,-720,386
601,-680,-647
-419,270,-589
-768,-432,384
-551,551,633
446,245,-440
-841,-424,512
-809,-603,428
436,-737,464
-411,284,-621
-584,489,641
413,339,-416
-705,-569,-775
353,409,-409

--- scanner 9 ---
547,349,-654
824,-472,701
-644,-834,480
809,716,519
-657,-723,492
-368,881,791
-757,-828,553
940,-594,-817
854,-528,544
944,-520,-701
-733,471,-569
-509,-702,-565
-727,491,-676
71,-90,48
-545,-613,-588
706,371,-617
-28,48,-23
-408,840,641
743,-462,627
-331,749,751
948,719,660
687,320,-528
-650,528,-619
-383,-609,-510
946,757,534
811,-584,-767

--- scanner 10 ---
-740,-619,-757
403,-769,757
651,553,-583
-125,59,140
-578,545,406
-465,625,-703
-628,644,-782
654,341,-562
487,-428,-512
-40,-61,-33
-748,-493,739
-499,661,-640
-911,-686,-751
645,426,727
677,498,-548
511,-466,-651
336,-729,685
-608,557,412
653,378,774
582,-502,-462
-757,-562,529
486,393,676
-888,-543,-704
379,-820,642
-631,498,517
-867,-568,638

--- scanner 11 ---
941,-739,560
613,-873,-755
-250,-778,413
-277,-898,530
-617,-592,-566
597,670,-558
-244,-906,280
883,396,403
912,-761,655
54,-124,-23
472,686,-642
646,-902,-740
110,5,-184
402,651,-573
-779,319,-933
-646,526,630
-650,-581,-780
917,425,593
823,-838,557
783,381,524
-486,459,559
-533,539,567
-562,-579,-580
-820,364,-822
-644,378,-875
561,-901,-536

--- scanner 12 ---
-617,543,-421
348,-946,-566
-411,-724,-749
369,-370,450
314,-925,-698
300,-845,-649
-693,-720,-759
762,378,599
-678,632,707
-684,479,702
355,-402,696
-673,490,-494
-477,-471,869
776,663,-580
-588,435,-385
-510,-377,845
-417,-541,876
712,360,654
759,831,-510
19,-107,5
-665,548,638
347,-416,664
-484,-676,-783
641,437,510
778,788,-710

--- scanner 13 ---
344,570,524
-490,680,714
675,-434,-443
-49,81,-108
576,634,-664
-591,726,633
-457,-579,572
782,-713,570
-553,631,560
-712,-581,-815
-909,863,-683
414,556,-668
540,611,-575
-913,747,-757
-456,-644,605
-793,-655,-805
788,-507,-449
786,-788,478
310,504,411
688,-446,-554
822,-819,444
357,410,433
-332,-642,591
-823,-498,-749
-780,813,-693

--- scanner 14 ---
554,-398,907
671,-408,753
-333,-662,-757
-736,552,-517
452,548,525
67,-58,-46
928,-620,-737
-700,-536,623
479,546,480
-656,440,-493
-832,425,-490
-523,-525,720
33,31,142
-522,311,899
491,423,-475
-300,-588,-695
886,-662,-691
-416,-622,-728
596,-327,784
612,455,-346
-466,311,914
-621,403,945
618,455,-410
539,549,709
929,-582,-577
-748,-528,776

--- scanner 15 ---
-106,-70,-82
536,766,563
-657,-414,-441
-485,-506,629
602,-683,-537
-840,-394,-506
638,-612,-726
-614,326,-440
542,656,454
-562,-419,613
-767,-430,-429
-29,61,72
284,-480,567
-587,373,372
335,-504,682
-537,335,449
-768,353,-434
-619,417,-519
676,-588,-587
611,647,664
561,787,-779
-574,361,570
-519,-489,467
485,639,-832
375,-437,610
418,810,-826

--- scanner 16 ---
-692,744,489
681,-914,-807
-593,301,-664
639,714,439
541,-677,704
602,729,416
17,40,88
-472,359,-689
853,461,-634
75,-15,-101
-629,420,-644
-451,-910,-849
602,-775,583
848,713,-628
-522,-858,-759
544,-839,-732
-630,797,487
922,614,-642
676,-827,-655
430,660,412
-558,663,467
-554,-778,-811
-624,-567,756
-439,-590,780
425,-687,585
-506,-576,593

--- scanner 17 ---
808,370,854
605,-787,565
-650,-572,-403
579,220,-540
710,421,840
738,366,835
607,-811,385
-659,559,475
668,271,-521
-657,720,493
-37,-152,-57
818,-684,-416
868,-694,-287
705,249,-680
-468,616,-418
-304,-687,460
94,-16,67
-493,-628,-373
-644,577,504
-576,-562,-484
-609,619,-279
-327,-648,502
-346,-708,355
752,-620,-283
508,-756,512
-483,657,-281

--- scanner 18 ---
734,-473,878
729,-454,797
-606,900,-657
-505,595,644
-942,-410,443
-880,-351,500
623,393,637
-953,-376,316
669,732,-429
-45,-25,-101
441,-263,-791
-534,555,727
-551,933,-481
698,530,673
716,-376,819
692,513,647
595,-253,-817
-638,808,-535
-425,-310,-496
665,877,-400
661,647,-389
-544,-354,-629
-425,-351,-584
520,-235,-898
-586,448,686
-155,166,46

--- scanner 19 ---
846,-264,-485
739,-282,-343
-538,-550,380
-811,408,-463
673,-492,417
709,-424,414
-60,18,59
412,555,810
537,418,-379
-618,-400,414
-848,540,-503
-922,556,359
723,-341,333
-921,489,366
787,410,-346
-542,-518,-570
36,179,-36
-620,-370,-549
-771,449,-613
778,-404,-408
510,478,721
-728,-531,397
-848,495,339
654,538,-352
-599,-432,-672
507,577,839

--- scanner 20 ---
-558,-529,-663
-613,-622,-537
-646,-486,588
571,-486,633
-718,889,703
-77,128,142
854,831,787
-617,551,-313
432,-754,-402
-636,-533,-501
743,961,-678
505,-748,-289
-819,870,603
444,-643,-389
69,47,57
-746,-373,605
827,951,670
593,920,-638
-724,571,-319
458,-473,570
-667,608,-396
618,-406,641
703,829,-715
860,959,920
-756,863,540
-659,-382,592

--- scanner 21 ---
387,619,594
735,-823,544
-642,-643,460
-687,-637,496
-746,-450,-504
-722,609,572
631,-786,-428
-779,-449,-439
-53,-92,180
380,695,-637
-618,829,-264
575,-816,-585
370,616,526
-652,793,-295
-765,-325,-441
492,750,535
673,-686,483
269,682,-649
275,795,-576
-669,713,484
-813,716,484
-784,-537,413
-167,47,127
641,-705,-502
-744,789,-370
653,-891,462

--- scanner 22 ---
499,-702,-536
448,-565,823
-255,-512,865
685,458,-611
116,-180,41
-380,-392,882
-672,-785,-539
-529,531,478
733,542,-633
409,698,515
488,-748,-343
-478,766,-541
670,451,-622
4,-3,10
513,-716,-316
-379,692,-555
574,-509,911
515,635,637
-484,-484,843
-733,-628,-494
440,689,617
-791,-749,-519
-466,600,560
-631,697,-549
-426,602,514
503,-575,770

--- scanner 23 ---
284,396,482
-929,-746,-731
491,-507,481
259,-796,-632
793,537,-400
-64,-180,-124
-787,-875,-748
265,-766,-644
-155,17,-183
-898,-463,599
370,-743,-585
-778,359,365
-983,323,-638
686,616,-428
-902,328,-619
712,462,-418
-752,365,348
-851,-486,456
-904,-634,532
324,388,567
295,392,712
592,-626,406
-742,434,228
382,-617,475
-850,-909,-712
-924,341,-541

--- scanner 24 ---
-718,-571,-517
404,564,-561
842,-505,-829
650,-521,-862
-763,-696,548
471,-506,521
-805,519,-708
-881,595,424
631,614,691
-70,-16,-109
-746,-532,-449
418,-609,642
739,555,651
-778,-535,-576
-862,627,-684
-734,676,466
384,-555,671
-736,581,-708
337,536,-590
-774,647,383
-748,-690,536
622,582,540
336,493,-524
772,-445,-881
-858,-732,520

--- scanner 25 ---
861,766,536
749,-623,-421
620,-665,806
861,751,592
717,-558,-548
-521,-827,-460
-890,-713,637
-621,-726,-420
-438,292,-490
-921,-546,657
-582,446,673
747,-638,902
-458,-623,-445
-812,-609,620
769,797,691
13,-105,-52
732,-641,726
-427,345,-591
626,332,-409
717,-494,-542
-618,523,506
-567,512,691
624,377,-382
623,561,-469
-594,345,-473

--- scanner 26 ---
-814,603,-395
392,-526,908
554,471,-570
469,363,917
479,-608,-454
-756,-741,596
-681,-640,477
623,357,890
-78,-73,73
-706,702,456
474,442,826
566,-553,-506
-680,-433,-426
-563,749,433
-687,-531,587
-450,-444,-422
506,-578,-362
442,-449,870
-595,-473,-418
571,630,-458
585,509,-438
-797,629,-389
-630,755,604
429,-647,882
-934,593,-464

--- scanner 27 ---
562,-872,-449
-705,-666,-777
-544,475,-752
455,323,-568
-667,-400,561
-613,485,-872
-719,607,616
-99,-152,23
596,-710,735
-652,-610,-704
-582,-401,765
-587,569,647
677,636,536
-607,448,633
629,-721,521
541,-723,721
-538,449,-735
741,721,685
558,-590,-439
514,-799,-415
-597,-695,-813
-10,11,-72
284,329,-501
768,715,531
-634,-429,546
307,376,-644

--- scanner 28 ---
813,-729,560
-696,-708,-638
-757,-610,-517
-828,599,563
-659,781,-782
591,865,-339
492,911,-431
-755,541,506
780,-791,634
-684,-804,633
697,-762,594
-52,47,13
377,-551,-580
-868,727,-809
-697,-680,568
457,-527,-468
281,-524,-453
-873,-620,-636
647,880,-339
-696,796,-805
-770,538,621
590,686,497
-664,-718,565
413,589,508
365,742,500

--- scanner 29 ---
-826,-688,686
661,-934,-381
-838,-820,763
462,-511,665
714,-516,659
845,426,-759
-617,311,-610
494,444,592
-49,9,15
-498,460,931
-913,-683,838
715,-725,-408
-774,-762,-552
-665,480,900
-590,215,-737
615,-442,673
571,611,628
799,525,-851
814,581,-851
560,426,577
-686,-939,-554
-676,-823,-673
-561,497,822
-593,391,-722
730,-762,-385

--- scanner 30 ---
544,-423,-876
-959,884,454
17,108,-84
-491,-610,-356
471,-348,621
599,575,849
505,483,-812
-934,735,-411
-795,915,361
510,-390,-760
470,-361,-843
416,505,-918
-865,908,421
-616,-720,637
-966,489,-425
539,-434,601
-660,-744,428
636,498,839
-920,703,-403
-121,-6,7
638,573,817
-390,-527,-404
-411,-659,-370
633,516,-910
536,-472,634
-612,-710,355

--- scanner 31 ---
-447,-404,-548
587,588,-619
492,-479,-265
559,367,-664
538,-793,480
-816,263,-631
519,448,882
643,520,-654
-29,-89,40
565,-682,597
-717,266,-452
-523,-663,748
-538,720,569
-626,-784,801
-175,-142,156
-704,-422,-545
547,419,815
-522,687,377
-462,739,447
-770,295,-525
-569,-473,-591
376,-643,-255
403,-534,-228
597,-833,588
476,382,883
-572,-813,835

--- scanner 32 ---
-334,-684,-605
853,429,455
-330,522,-519
428,-660,-348
768,578,519
-388,583,-461
-403,580,-576
-272,-717,940
846,540,-312
428,-515,976
-24,-83,10
858,430,-328
163,-155,143
547,-518,-357
-353,-784,-706
532,-594,-332
847,583,428
550,-476,911
-264,-467,973
-578,379,600
410,-408,834
-360,-847,-643
-589,593,567
-392,-600,967
-591,393,655
781,357,-292

--- scanner 33 ---
-538,-478,-649
-558,678,-597
864,-661,842
938,-647,743
-506,-530,-729
692,-634,-698
-456,-600,488
-340,759,966
703,372,692
-622,578,-624
95,-76,122
774,408,795
-312,737,737
869,-655,590
560,-557,-710
-648,689,-616
-435,-440,-781
-577,-625,430
-613,-645,549
772,454,755
636,323,-375
705,478,-371
705,379,-257
697,-482,-785
-220,776,841

--- scanner 34 ---
-319,-366,692
-673,-708,-703
-462,-377,679
816,-624,-462
-382,408,518
398,-442,790
-819,667,-544
111,179,111
862,-691,-399
-790,807,-670
949,-670,-361
421,-428,872
18,45,-75
-420,406,644
-669,-727,-773
665,835,741
611,803,724
496,-454,779
892,703,-858
624,883,788
935,733,-741
-480,-348,694
-423,545,503
-768,648,-633
-618,-713,-675
928,867,-850

--- scanner 35 ---
-515,-659,738
366,-600,566
-614,410,609
-712,799,-745
-483,427,719
-654,840,-659
-722,673,-635
412,352,489
682,511,-441
581,594,-404
457,-490,489
487,-581,-790
473,372,415
-598,-484,-361
-453,-536,717
-633,393,799
-601,-557,795
-544,-501,-393
406,379,416
325,-450,526
449,-707,-788
-557,-437,-313
25,-95,180
692,713,-356
490,-722,-651
-1,86,40

--- scanner 36 ---
620,426,-526
777,-583,514
901,-648,527
-13,59,-94
118,-48,53
-484,-785,-793
-699,790,515
606,613,-593
811,-587,-508
-444,-521,456
-594,-769,-805
-630,794,343
-684,767,552
-667,-805,-728
-441,-636,441
815,-580,547
849,-611,-647
-633,739,-645
597,450,-711
-502,-578,383
805,623,515
775,-516,-697
-714,717,-779
-767,719,-717
707,502,454
717,621,338`;
