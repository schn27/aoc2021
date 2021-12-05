"use strict";

function calc() {
	const segments = input.split('\n').map(s => s.match(/\d+/g).map(Number));

	const map1 = {};
	const map2 = {};

	segments.forEach(([x1, y1, x2, y2]) => {
		const diagonal = (x1 != x2) && (y1 != y2);

		while (x1 != x2 || y1 != y2) {
			addPoint(x1, y1, map1, map2, diagonal);
			x1 += Math.sign(x2 - x1);
			y1 += Math.sign(y2 - y1);
		}

		addPoint(x1, y1, map1, map2, diagonal);
	});

	const part1 = Object.values(map1).filter(v => v > 1).length;
	const part2 = Object.values(map2).filter(v => v > 1).length;

	return part1 + ' ' + part2;
}

function addPoint(x, y, map1, map2, diagonal) {
	const xy = [x, y].join(',');

	if (!diagonal) {
		map1[xy] = (map1[xy] || 0) + 1;
	}

	map2[xy] = (map2[xy] || 0) + 1;
}

const input = `599,531 -> 599,32
435,904 -> 435,489
768,714 -> 768,187
845,552 -> 596,801
167,680 -> 167,445
45,887 -> 45,346
780,295 -> 179,896
310,539 -> 602,831
535,556 -> 349,556
797,180 -> 797,62
771,406 -> 120,406
383,296 -> 383,918
689,815 -> 73,199
658,642 -> 658,333
931,104 -> 708,104
406,278 -> 406,29
315,532 -> 773,74
439,953 -> 289,953
555,162 -> 695,302
444,522 -> 444,828
460,844 -> 460,972
838,18 -> 143,713
335,785 -> 335,485
757,886 -> 757,327
266,205 -> 273,205
934,42 -> 19,957
671,622 -> 263,214
739,781 -> 739,332
848,507 -> 848,394
577,58 -> 461,174
49,905 -> 921,33
627,455 -> 205,455
106,523 -> 974,523
707,335 -> 707,313
65,214 -> 712,214
610,267 -> 610,403
47,699 -> 565,181
288,833 -> 709,833
452,59 -> 452,632
629,209 -> 125,209
535,232 -> 535,342
542,942 -> 542,753
618,905 -> 552,905
598,314 -> 976,314
350,824 -> 17,824
753,570 -> 753,617
544,302 -> 259,302
628,271 -> 628,379
856,265 -> 856,792
77,317 -> 77,122
905,420 -> 905,687
812,512 -> 812,411
844,486 -> 771,559
798,778 -> 798,215
571,160 -> 278,453
242,352 -> 227,352
958,118 -> 167,909
201,915 -> 201,564
163,583 -> 163,279
23,111 -> 23,883
248,281 -> 331,281
381,768 -> 900,768
78,988 -> 78,326
914,659 -> 247,659
532,531 -> 520,531
65,309 -> 734,978
170,923 -> 399,694
740,496 -> 196,496
832,452 -> 816,452
675,463 -> 878,463
659,852 -> 560,852
143,655 -> 227,655
334,795 -> 334,978
217,913 -> 368,913
675,33 -> 503,33
42,981 -> 811,981
458,162 -> 722,162
92,613 -> 92,542
393,584 -> 393,252
276,256 -> 725,705
752,442 -> 752,789
63,281 -> 744,281
596,845 -> 35,284
594,534 -> 964,164
337,380 -> 337,511
158,142 -> 75,225
606,47 -> 606,111
987,30 -> 62,955
192,196 -> 428,196
449,672 -> 449,77
804,151 -> 804,255
783,581 -> 287,581
860,891 -> 69,100
966,187 -> 761,392
400,742 -> 278,742
661,656 -> 592,587
787,415 -> 787,771
866,228 -> 417,228
915,385 -> 505,385
715,620 -> 715,633
615,31 -> 615,940
691,885 -> 527,885
426,705 -> 351,705
258,215 -> 258,949
480,449 -> 480,710
788,710 -> 788,67
850,90 -> 597,90
398,379 -> 18,759
248,107 -> 665,524
901,933 -> 208,240
433,424 -> 110,424
214,447 -> 389,272
468,330 -> 468,928
950,759 -> 332,759
447,541 -> 420,541
659,138 -> 604,83
821,264 -> 95,264
914,132 -> 46,132
821,604 -> 821,57
805,734 -> 85,14
806,274 -> 164,916
205,780 -> 205,133
798,472 -> 361,472
817,57 -> 127,747
172,119 -> 922,869
118,167 -> 55,167
56,548 -> 344,836
117,108 -> 940,931
530,46 -> 530,785
528,507 -> 729,708
11,986 -> 987,10
979,932 -> 76,29
863,250 -> 210,903
879,215 -> 891,215
592,219 -> 592,528
211,760 -> 211,347
21,842 -> 633,230
110,356 -> 110,254
925,606 -> 444,125
757,566 -> 757,498
702,622 -> 637,622
51,379 -> 365,379
273,906 -> 273,494
170,795 -> 929,36
159,56 -> 435,56
724,953 -> 724,735
536,748 -> 901,748
937,148 -> 937,510
963,507 -> 863,507
840,290 -> 840,221
864,154 -> 55,963
977,487 -> 685,487
863,617 -> 210,617
862,308 -> 291,879
286,477 -> 286,276
550,805 -> 550,489
964,508 -> 821,651
475,290 -> 789,290
25,882 -> 25,349
570,374 -> 604,374
354,442 -> 514,282
457,700 -> 360,700
548,889 -> 548,502
11,393 -> 11,829
60,714 -> 781,714
943,953 -> 972,924
757,386 -> 465,386
230,463 -> 27,463
815,385 -> 326,385
32,630 -> 378,976
298,853 -> 298,644
532,146 -> 23,146
958,685 -> 737,464
853,847 -> 79,73
815,590 -> 815,961
49,87 -> 751,789
55,513 -> 55,378
163,907 -> 574,907
355,168 -> 355,836
453,742 -> 674,742
273,458 -> 685,458
981,961 -> 958,984
120,59 -> 401,59
735,964 -> 395,964
277,377 -> 277,646
633,694 -> 633,707
224,376 -> 976,376
201,790 -> 293,790
950,952 -> 12,14
389,48 -> 356,48
337,424 -> 166,424
591,915 -> 591,456
205,162 -> 942,162
404,421 -> 404,748
319,983 -> 608,694
94,677 -> 94,853
873,388 -> 873,617
858,82 -> 858,890
64,503 -> 64,787
372,224 -> 50,546
531,241 -> 960,670
47,33 -> 975,961
853,52 -> 271,634
668,437 -> 668,719
162,290 -> 843,290
421,299 -> 944,822
103,983 -> 103,324
290,71 -> 290,686
209,38 -> 546,38
740,878 -> 378,878
741,795 -> 741,916
27,431 -> 445,431
795,289 -> 795,759
345,772 -> 775,772
977,480 -> 512,15
49,863 -> 49,659
223,590 -> 779,590
503,771 -> 917,771
499,289 -> 935,725
246,459 -> 246,395
860,257 -> 656,257
425,87 -> 425,603
355,378 -> 355,23
462,286 -> 462,358
181,571 -> 181,732
17,649 -> 476,649
394,321 -> 394,293
812,660 -> 515,957
21,150 -> 799,928
437,593 -> 437,372
125,495 -> 373,743
482,404 -> 482,420
283,580 -> 283,234
667,966 -> 827,806
959,961 -> 959,931
461,845 -> 206,845
299,888 -> 299,836
680,828 -> 680,855
958,977 -> 26,45
847,419 -> 290,976
892,920 -> 892,180
487,945 -> 487,445
329,570 -> 583,570
110,940 -> 989,61
475,351 -> 882,351
953,229 -> 429,229
119,125 -> 749,125
834,103 -> 212,725
978,412 -> 978,343
916,310 -> 758,310
825,761 -> 720,761
353,954 -> 353,795
422,464 -> 422,356
662,964 -> 836,790
242,873 -> 242,570
742,972 -> 797,972
698,364 -> 360,26
258,633 -> 19,872
406,649 -> 406,685
386,710 -> 925,710
347,657 -> 524,480
812,905 -> 554,647
420,505 -> 420,231
908,693 -> 908,724
130,772 -> 130,898
560,23 -> 560,987
941,831 -> 941,544
817,940 -> 132,255
515,280 -> 515,811
544,102 -> 568,102
115,612 -> 67,660
743,762 -> 743,152
246,14 -> 691,459
766,492 -> 673,492
467,179 -> 351,63
655,779 -> 655,524
314,171 -> 314,108
414,64 -> 502,64
564,239 -> 894,239
984,974 -> 56,46
201,963 -> 201,223
238,194 -> 238,832
30,652 -> 477,652
818,735 -> 582,971
225,566 -> 673,566
172,865 -> 74,865
264,101 -> 264,812
487,916 -> 979,916
879,30 -> 10,899
797,657 -> 797,136
750,642 -> 593,799
550,244 -> 418,376
158,816 -> 668,816
505,648 -> 303,648
411,688 -> 263,688
544,35 -> 771,35
545,846 -> 286,846
284,760 -> 284,929
835,401 -> 708,401
533,591 -> 545,591
866,757 -> 475,757
202,62 -> 907,767
456,655 -> 456,123
367,714 -> 225,714
359,679 -> 926,679
623,853 -> 623,865
170,120 -> 213,120
481,741 -> 481,435
928,73 -> 41,960
551,282 -> 551,265
988,986 -> 12,10
351,172 -> 791,172
49,65 -> 952,968
725,617 -> 691,617
509,159 -> 697,159
83,985 -> 83,968
206,617 -> 334,489
880,682 -> 966,768
60,896 -> 60,617
501,686 -> 49,234
801,708 -> 738,771
548,883 -> 548,33
753,162 -> 29,162
102,478 -> 102,295
115,656 -> 637,134
924,970 -> 924,963
191,340 -> 191,515
764,481 -> 523,481
97,619 -> 97,890
228,183 -> 228,624
171,867 -> 68,867
797,685 -> 167,685
510,955 -> 464,955
930,955 -> 233,258
934,572 -> 934,900
217,822 -> 797,242
868,939 -> 369,440
861,811 -> 861,36
346,617 -> 346,153
754,526 -> 754,426
482,724 -> 482,21
328,984 -> 976,984
933,895 -> 325,287
965,973 -> 232,240
502,707 -> 767,972
353,680 -> 815,218
311,210 -> 311,157
156,944 -> 928,172
615,395 -> 101,909
107,500 -> 528,921
375,42 -> 375,796
13,292 -> 818,292
613,144 -> 613,541
340,677 -> 340,406
631,655 -> 744,655
22,242 -> 723,943
705,596 -> 980,321
316,955 -> 316,515
760,279 -> 44,279
391,328 -> 391,724
917,476 -> 917,668
66,907 -> 913,60
597,260 -> 362,25
568,584 -> 568,297
375,506 -> 375,300
988,31 -> 72,947
425,342 -> 154,342
196,395 -> 899,395
904,17 -> 94,17
546,159 -> 751,159
284,557 -> 175,448
69,201 -> 697,201
130,421 -> 224,421
646,462 -> 637,453
187,638 -> 621,638
832,212 -> 416,212
614,582 -> 348,582
677,404 -> 677,709
178,122 -> 915,859
81,849 -> 223,849
717,18 -> 646,18
723,666 -> 974,666
703,234 -> 130,234
317,107 -> 106,107
207,397 -> 207,375
688,465 -> 982,171
749,201 -> 610,201
280,313 -> 827,860
773,873 -> 917,873
337,908 -> 337,155
541,427 -> 385,583
611,314 -> 131,794
966,909 -> 104,47
785,556 -> 346,556
914,645 -> 914,718
683,941 -> 657,915
919,665 -> 310,56
743,978 -> 779,978
953,925 -> 953,854
899,347 -> 705,347
46,597 -> 46,255
332,364 -> 922,954
38,987 -> 832,193
77,585 -> 77,262
155,61 -> 734,640
953,136 -> 655,136
939,730 -> 158,730
903,458 -> 393,458
50,227 -> 50,249
536,814 -> 536,242
906,694 -> 259,47
317,237 -> 853,773
828,55 -> 509,55
40,664 -> 341,965
414,820 -> 53,459
244,344 -> 272,344
191,606 -> 308,606
329,409 -> 329,960
166,863 -> 938,91
655,396 -> 291,760
634,666 -> 625,666
360,622 -> 360,550
568,473 -> 840,201
534,162 -> 534,823
583,563 -> 583,521
124,447 -> 124,79
207,559 -> 207,649
688,238 -> 26,900
173,33 -> 117,33
665,800 -> 665,86
121,515 -> 121,132
32,472 -> 32,960
513,28 -> 513,299
881,612 -> 881,415
72,71 -> 977,976
169,821 -> 111,821
603,756 -> 254,756
182,129 -> 182,824
746,670 -> 942,670
143,15 -> 72,86
108,134 -> 963,989
860,388 -> 834,362
252,811 -> 473,811
575,306 -> 575,368
686,471 -> 686,38
673,59 -> 673,861
461,949 -> 491,949
915,373 -> 330,958
933,699 -> 588,699
254,798 -> 254,498
329,865 -> 329,926
569,243 -> 659,243
762,808 -> 921,967
722,460 -> 68,460
136,470 -> 355,470
133,919 -> 56,842
87,868 -> 853,102
622,102 -> 446,102
798,494 -> 135,494
281,858 -> 281,172
141,172 -> 765,796
794,194 -> 102,886
539,983 -> 539,895
841,755 -> 841,365
695,429 -> 166,958
965,933 -> 899,933
603,699 -> 603,708
598,635 -> 844,635
288,190 -> 288,946
559,383 -> 423,383
795,332 -> 409,718
600,645 -> 478,645
831,24 -> 905,24
13,817 -> 606,224
828,878 -> 96,146
32,197 -> 32,891
84,832 -> 84,756
404,281 -> 404,781
394,441 -> 489,536
845,876 -> 589,876
833,114 -> 833,834
979,130 -> 979,238
907,189 -> 396,700
448,740 -> 714,474
145,837 -> 100,837
982,983 -> 38,39
962,506 -> 962,764
773,922 -> 975,922
892,666 -> 904,654
754,201 -> 459,496
108,829 -> 108,894
122,381 -> 122,484
683,301 -> 630,354
47,103 -> 897,953
549,880 -> 942,487
944,15 -> 44,915
713,456 -> 713,402
83,865 -> 239,865
814,585 -> 814,105
980,439 -> 685,439`;
