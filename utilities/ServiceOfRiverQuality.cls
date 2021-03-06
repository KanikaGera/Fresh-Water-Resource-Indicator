Class utilities.ServiceOfRiverQuality
{

ClassMethod CreateArrays() As %Status
{
   //set ^Parameters("DO",10)=8
   set ^DO(10)=8
   set ^DO(20)=13
   set ^DO(30)=20
   set ^DO(40)=30
   set ^DO(50)=43
   set ^DO(60)=56
   set ^DO(70)=77
   set ^DO(80)=88
   set ^DO(85)=92
   set ^DO(90)=95
   set ^DO(95)=97.5
   set ^DO(100)=99
   set ^DO(105)=98
   set ^DO(110)=95
   set ^DO(120)=90
   set ^DO(130)=85
   set ^DO(140)=78
   set ^DO(141)=50
   
   set ^PH(1)=0
   set ^PH(2)=2
   set ^PH(3)=4
   set ^PH(4)=8
   set ^PH(5)=24
   set ^PH(6)=55
   set ^PH(7)=90
   set ^PH(7.2)=92
   set ^PH(7.5)=93
   set ^PH(7.7)=90
   set ^PH(8)=82
   set ^PH(8.5)=67
   set ^PH(9)=47
   set ^PH(10)=19
   set ^PH(11)=7
   set ^PH(12)=2
   set ^PH(13)=0
   
   set ^Ni(0)=98
   set ^Ni(0.25)=97
   set ^Ni(0.5)=96
   set ^Ni(0.75)=95
   set ^Ni(1)=94
   set ^Ni(1.5)=92
   set ^Ni(2)=90
   set ^Ni(3)=85
   set ^Ni(4)=70
   set ^Ni(5)=65
   set ^Ni(10)=51
   set ^Ni(15)=43
   set ^Ni(20)=37
   set ^Ni(30)=24
   set ^Ni(40)=17
   set ^Ni(50)=17
   set ^Ni(60)=5
   set ^Ni(70)=4
   set ^Ni(80)=3
   set ^Ni(90)=2
   set ^Ni(100)=1
   
    set ^FCol(1) = 99
	set ^FCol(2) = 91
	set ^FCol(3) = 86
	set ^FCol(4) = 82
	set ^FCol(5) = 80
	set ^FCol(6) = 78
	set ^FCol(7) = 76
	set ^FCol(8) = 74
	set ^FCol(9) = 73
	set ^FCol(10) = 72
	set ^FCol(20) = 63
	set ^FCol(30) = 58
	set ^FCol(40) =55
	set ^FCol(50) = 52
	set ^FCol(60) = 50
	set ^FCol(70) = 48
	set ^FCol(80) = 47
	set ^FCol(90) = 45
	set ^FCol(100) = 44
	set ^FCol(200) = 37
	set ^FCol(300) = 34
	set ^FCol(400) = 31
	set ^FCol(500) = 29
	set ^FCol(600) = 27
	set ^FCol(700) = 25
	set ^FCol(800) = 24
	set ^FCol(900) = 23
	set ^FCol(1000) = 22
	set ^FCol(2000) = 18
	set ^FCol(3000) = 16
	set ^FCol(4000) = 15            
	set ^FCol(5000) =14
	set ^FCol(6000) = 13                        
	set ^FCol(7000) = 12                        
	set ^FCol(8000) = 11                        
	set ^FCol(9000) = 11                        
	set ^FCol(10000) = 10                        
	set ^FCol(20000) = 8                        
	set ^FCol(30000) = 7                        
	set ^FCol(40000) = 6                        
	set ^FCol(50000) = 6                        
	set ^FCol(60000) = 5                        
	set ^FCol(70000) = 5                        
	set ^FCol(80000) = 5                        
	set ^FCol(90000) = 4                        
	set ^FCol(100000) = 4                        
	set ^FCol(100001) = 2
	
	return $$$OK 
}


ClassMethod IndexCalc(ph As %Numeric, ni As %Numeric, do As %Numeric, fcol As %Numeric) As %Numeric
{
	set temp = do/8.26
	set do = temp * 100
	
	set do = $NORMALIZE(do,0)		
    
    if (do>=0 && do<15)
    {
    set do = 10
    }
    elseif ( do<25)
    {
    set do =20
    }
    elseif ( do<35)
    {
    set do =30
    }
    elseif ( do<45)
    {
    set do =40
    }
    elseif ( do<55)
    {
    set do =50
    }
    elseif ( do<65)
    {
    set do =60
    }
    elseif ( do<75)
    {
    set do =70
    }
    elseif ( do<85)
    {
    set do =80
    }
    elseif (do<87)
    {
    set do =85
    }
    elseif ( do<92)
    {
    set do =90
    }
    elseif ( do<97)
    {
    set do =95
    }
    elseif ( do<102)
    {
    set do =100
    }
    elseif ( do<107)
    {
    set do = 105
    }
    elseif ( do<112)
    {
    set do =110
    }
    elseif ( do<125)
    {
    set do =120
    }
    elseif ( do<135)
    {
    set do =130
    }
    elseif ( do>135)
    {
    set do =140
    }
    
    
    
	
	if (ni >= 0 && ni< 0.15)
	{
    set ni = 0
	}
	elseif (ni< 0.25)
	{
    set ni = 0.25
	}
	elseif (ni >= 0.25 && ni< 0.37)
	{
	    set ni = 0.25
	}
	elseif (ni >= 0.37 && ni< 0.50)
	{
	    set ni = 0.50
	}
	elseif (ni >= 0.67 && ni< 0.75)
	{
	    set ni = 0.50
	}
	elseif (ni >= 0.75 && ni< 1)
	{
	    set ni = 0.75
	}
	elseif (ni >=1 && ni< 1.25)
	{
	    set ni = 1
	}
	elseif (ni >= 1.25 && ni< 1.75)
	{
	    set ni = 1.5
	}
	elseif (ni >= 1.75 && ni< 2.5)
	{
	    set ni = 2
	}
	elseif (ni >= 2.5 && ni< 3.5)
	{
	    set ni = 3
	}
	elseif (ni >= 3.5 && ni< 4.5)
	{
	    set ni = 4
	}
	elseif (ni >= 4.5 && ni< 7.5)
	{
	    set ni = 5
	}
	elseif (ni >= 7.5 && ni< 12.5)
	{
	    set ni = 10
	}
	elseif (ni >= 12.5 && ni< 17.5)
	{
	    set ni = 15
	}
	elseif (ni >= 17.5 && ni< 25)
	{
	    set ni = 20
	}
	elseif (ni >= 25 && ni< 35)
	{
	    set ni = 30
	}
	elseif (ni >= 35 && ni< 45)
	{
	    set ni = 40
	}
	elseif (ni >= 45 && ni< 55)
	{
	    set ni = 50
	}
	elseif (ni >= 55 && ni< 65)
	{
	    set ni = 60
	}
	elseif (ni >= 65 && ni< 75)
	{
	    set ni = 70
	}
	elseif (ni >= 75 && ni< 85)
	{
	    set ni = 80
	}
	elseif (ni >= 85 && ni< 95)
	{
	    set ni = 90
	}
	elseif (ni >= 95 && ni< 100)
	{
	    set ni = 100
	}
	
	//set do = ROUND(do,0)
	//write "Jello",Round(do,0)
	//write ROUND(do,0)
	//do $system.Status.DisplayError(mean)
	///round the values of ph to values we have in globals

	if (ph<= 7.1 || ph>=9)
	{
		set ph = $NORMALIZE(ph,0)
	}
	elseif (ph>8 && ph<9)
	{
		set ph=8.5
	}
	elseif (ph>7.1 && ph<7.4)
	{
		set ph=7.2
	}
	elseif (ph>=7.4 && ph<7.6)
	{
		set ph=7.5
	}
	elseif (ph>=7.6 && ph<7.8)
	{
		set ph=7.7
	}
	elseif (ph>=7.8 && ph<=8)
	{
		set ph=8
	}
	
	///fcol
	if (fcol >= 1 && fcol <10)
	{
		set fcol = $NORMALIZE(fcol,0)
	}
	elseif (fcol >= 10 && fcol <100)
	{
			 set fcol = fcol / 10
			 set fcol =$NORMALIZE(fcol,0)
			 set fcol = fcol * 10
	}
	elseif (fcol >= 100 && fcol <1000)
	{
			    set fcol = fcol \ 100
			   // set fcol = ROUND(fcol,0)
			    set fcol = fcol * 100
	}
	elseif (fcol >= 1000 && fcol <10000)
	{
			    set fcol = fcol \ 1000
			    //set fcol = ROUND(fcol,0)
			    set fcol = fcol * 1000
	}
	elseif (fcol >= 10000 && fcol <100000)
	{
			    set fcol = fcol \ 10000
			    //set fcol = ROUND(fcol,0)
			    set fcol = fcol * 10000
	}
	
	set count =4
	
	if (ph=-1)
	{
	 set count = count-1
	}
	if (fcol = -1)
	{
	 set count = count-1
	}
	if (do =-1)
	{
	set count = count-1
	}
	if (ni = -1)
	{
	set count = count-1
	}
	
	set weight = 1/count
	set wph =weight
	set wdo = weight
	set wni = weight
	set wfcol = weight
	
	if (ph=-1)
	{
	 set wph=0
	 set ph =1
	}
	if (fcol = -1)
	{
	 set wfcol =0
	 set fcol=1
	}
	if (do =-1)
	{
	set wdo =0
	set do = 10
	}
	if (ni = -1)
	{
	set wni=0
	set ni =0
	}
	
	
	set wph = ^PH(ph) * wph
	set wdo = ^DO(do) * wdo
	set wfcol = ^FCol(fcol) * wfcol
	set wni = ^Ni(ni) * wni
	
	set index = wph+wdo+wfcol+wni
	
	return index
}

}
