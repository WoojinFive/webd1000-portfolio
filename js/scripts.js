"use strict";

function closeResume()
{
    // var targetElement = document.getElementById('resumeTargetArea');
    
    // var newHtmlLine = "";

    // newHtmlLine += "<div onclick=openResume()>";
    // newHtmlLine += "<h2><button type='button' class='btn btn-lg btn-secondary'>Open my resume</a></h2>";
    // newHtmlLine += "</div>";

    // targetElement.innerHTML = newHtmlLine;

    document.getElementById("resumeTriggerArea").style.display = "block";
    document.getElementById("resumeContent").style.display = "none";
}

function openResume()
{
    document.getElementById("resumeTriggerArea").style.display = "none";
    document.getElementById("resumeContent").style.display = "block";

    document.getElementById('closeResume').innerHTML = "<div onclick=closeResume()><h2><a type='button' class='btn btn-lg btn-secondary' href='#resumeStart'>Close my resume</a></h2></div>";

    //var newHtmlLine = "";

    // newHtmlLine += "<h3>Woojin Oh</h3>";
    // newHtmlLine += "<hr class='resume-divider-first'>";
    // newHtmlLine += "<p>Halifax, NS <span class='center'>c. 782. 000. 0000</span> <span class='right'>e. kh3996@gmail.com</span></p>";
    // newHtmlLine += "<h3>Profile</h3>";
    // newHtmlLine += "<hr class='resume-divider'>";
    // newHtmlLine += "<p>A highly professional and proven talent with data analysis and problem solving skills as an engineer, and insight and communication skills as a sales and operations manager and even more software development knowledge. Modesty and constant effort are the motto of my life.  According to the motto of my life, I constantly analyze problems and try to come up with better ways when faced with problems or challenges.</p>";
    // newHtmlLine += "<h3>Working Experience</h3>";
    // newHtmlLine += "<hr class='resume-divider'>";
    // newHtmlLine += "<h4>Sell Your Travel, Seoul, Korea<span class='right'>2016 - 2017</span></h4>";
    // newHtmlLine += "<h5>Planning & Management Team - Web Developer & Team Manager</h5>";
    // newHtmlLine += "<ul>";
    // newHtmlLine += "    <li>Website maintenance (www.sellyourtravel.com)</li>";
    // newHtmlLine += "    <li>Planning the strategy of corporation management and setting the operating system and regulation</li>";
    // newHtmlLine += "    <li>Planning and developing travel products</li>";
    // newHtmlLine += "    <p class='list'>- Travel of European Soccer, Wheelchair Trip, etc</p>";
    // newHtmlLine += "    <li>Tour guide management (recruiting, sales, and management for tour guides) and customer reception</li>";
    // newHtmlLine += "    <p class='list'>- Managing of tour guide resources</p>";
    // newHtmlLine += "    <p class='list'>- Receiving of customer inquiry and doing promotional activities</p>";
    // newHtmlLine += "</ul>";
    // newHtmlLine += "<h6>Accomplishments:  Successfully contributed to establish the start-up company’s overall strategy and business direction and to improve sales by three times developing a lot of travel products and to the reorganization of the company website and have successfully carried out maintenance work.</h6>";
    // newHtmlLine += "<br>";
    // newHtmlLine += "<h4>SAMSUNG DISPLAY (Display part of Samsung Electronics), Yongin, Korea<span class=right>2011 - 2015</span></h4>";
    // newHtmlLine += "<h5>OLED Research Center & Development Center - Engineer</h5>";
    // newHtmlLine += "<ul>";
    // newHtmlLine += "    <li>Flexible OLED display development</li>";
    // newHtmlLine += "    <p class='list'>- Circuit and panel design</p>";
    // newHtmlLine += "    <p class='list'>- Charged in developing smartphones of Samsung Electronics, Apple, Motorola, and Blackberry</p>";
    // newHtmlLine += "    <li>Flexible OLED display research</li>";
    // newHtmlLine += "    <p class='list'>- Research for securing flexibility of display panel</p>";
    // newHtmlLine += "    <p class='list'>- Research for improving reliability of TFT</p>";
    // newHtmlLine += "    <li>Patent application relevant to flexible OLED display</li>";
    // newHtmlLine += "    <p class='list'>- Applied a lot of domestic and overseas patents to improve the yield and reliability of flexible OLED display panel</p>";
    // newHtmlLine += "</ul>";
    // newHtmlLine += "<h6>Accomplishments:  Successfully contributed to the development of displays for Samsung, Apple, and Motorola smartphones by focusing on new technology research. Applied for a lot of patents due to his constant efforts for problem solving and improvement.</h6>";
    // newHtmlLine += "<br>";
    // newHtmlLine += "<h3>EDUCATION & PROFESSIONAL DEVELOPMENT</h3>";
    // newHtmlLine += "<hr class='resume-divider'>";
    // newHtmlLine += "<h4>NOVA SCOTIA COMMUNITY COLLEGE, Halifax, NS, Canada<span class=right>2018 - Present</span></h4>";
    // newHtmlLine += "<h5>IT Web Development</h5>";
    // newHtmlLine += "<ul>";
    // newHtmlLine += "    <li>Programming Language : JavaScript</li>";
    // newHtmlLine += "    <li>Web Language : HTML, CSS</li>";
    // newHtmlLine += "    <li>Database : SQL</li>";
    // newHtmlLine += "    <p class='list'>- Travel of European Soccer, Wheelchair Trip, etc</p>";
    // newHtmlLine += "    <li>Tour guide management (recruiting, sales, and management for tour guides) and customer reception</li>";
    // newHtmlLine += "    <p class='list'>- Managing of tour guide resources</p>";
    // newHtmlLine += "    <p class='list'>- Receiving of customer inquiry and doing promotional activities</p>";
    // newHtmlLine += "</ul>";
    // newHtmlLine += "<br>";
    // newHtmlLine += "<h4>SAMSUNG MOBILE DISPLAY, Cheonan, Korea<span class=right>2011</span></h4>";
    // newHtmlLine += "<h5>OLED Research Center – Intern Engineer</h5>";
    // newHtmlLine += "<br>";
    // newHtmlLine += "<h4>UNIVERSITY OF SEOUL, Seoul, Korea<span class=right>2011</span></h4>";
    // newHtmlLine += "<h5>School of Electrical and Computer Engineering</h5>";
    // newHtmlLine += "<br>";
    // newHtmlLine += "<h4>TRIPHOS, Seoul, Korea<span class=right>2011</span></h4>";
    // newHtmlLine += "<h5>Mobile Solution Development Center – Intern</h5>";
    // newHtmlLine += "<br>";
    // newHtmlLine += "<h4>AWARDED AN HONORABLE DISCHARGE FROM ARMY, Korea<span class=right>2007 - 2009</span></h4>";
    // newHtmlLine += "<h5>Communication Command</h5>";
    // newHtmlLine += "<br>";
    // newHtmlLine += "<h4>GWANGYANG HIGH SCHOOL, Seoul, Korea<span class=right>2004</span></h4>";
    // newHtmlLine += "<br>";
    // newHtmlLine += "<h4>Professional Development</h4>";
    // newHtmlLine += "<ul>";
    // newHtmlLine += "    <li>PROG 1700 – NSCC, 2018 (JavaScript) – In progress</li>";
    // newHtmlLine += "    <li>WEBD 1000 – NSCC, 2018 (HTML5, CSS3) – In progress</li>";
    // newHtmlLine += "    <li>DBAS 1007 – NSCC, 2018 (SQL) – In progress</li>";
    // newHtmlLine += "    <li>High Microsoft software proficiency (Excel, Word, PowerPoint)</li>";
    // newHtmlLine += "    <li>Word processor license 2nd</li>";
    // newHtmlLine += "    <li>Applied many domestic and overseas patents to improve the yield and reliability of flexible OLED display panel</li>";
    // newHtmlLine += "</ul>";
    // newHtmlLine += "<br>";
    // newHtmlLine += "<h3>DISTINCTIONS & HONORS</h3>";
    // newHtmlLine += "<hr class='resume-divider'>";
    // newHtmlLine += "<h4>Volunteer Activities</h4>";
    // newHtmlLine += "<ul>";
    // newHtmlLine += "    <li>The disabled welfare foundation - Volunteer</li>";
    // newHtmlLine += "    <li>High school student council – Chair of department of academic environment</li>";
    // newHtmlLine += "</ul>";
    // newHtmlLine += "<br>";
    // newHtmlLine += "<h4>References</h4>";
    // newHtmlLine += "<h5>Appropriate references will be provided.</h5>";
    // newHtmlLine += "<br>";
    // newHtmlLine += "<div onclick=closeResume()>";
    // newHtmlLine += "<h2><a type='button' class='btn btn-lg btn-secondary' href='#resumeStart'>Close my resume</a></h2>";
    // newHtmlLine += "</div>";

    //targetElement.innerHTML = newHtmlLine;

}

document.getElementById('resumeTriggerArea').addEventListener('click',openResume);
