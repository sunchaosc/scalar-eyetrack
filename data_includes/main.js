PennController.ResetPrefix(null) // Keep this here
// PennController.DebugOff()
// IMPORTANT NOTE: when running this project, the eye-tracker will highlight
// the element that it estimates the participant is looking at
// Edit the file PennController.css in the Aesthetics folder to remove highlighting
//

// Resources are hosted as ZIP files on a distant server
PreloadZip("https://pcibex.research-zas.de/ibexfiles/scalar/Picture.zip")
PreloadZip("https://pcibex.research-zas.de/ibexfiles/scalar/Audio.zip")

// Replace the URL with one that points to a PHP script that you uploaded to your webserver
// see: https://doc.pcibex.net/how-to-guides/collecting-eyetracking-data/#php-script
EyeTrackerURL("https://pcibex.research-zas.de/eyegaze/script.php")

// Sequence of the elements in the experiment
Sequence("Preload","WebcamCheck", "ChromeCheck", "L1Check", "Welcome", "Consent", "ProlificID_trial",  "WebcamSetUp",  "AudioSetUp", "AudioCheck",  "Instructions", "PractiseSession", "EndOfPractise", "Counter", subsequence(repeat(randomize("Main"), 16), "BlinkBreak"), "QuestionnairePage", "Send", "FinalPage")
//

// Wait if the resources have not finished preloading by the time the tracker is calibrated
CheckPreloaded("Preload")

// We ask the participants whether they give permission to use the webcam (even though the same question should have been promted by the browser), whether they are on Chrome, and whether they speak English as an L1. If they answer 'no' on any of these questions, they cannot continue to the experiment.
newTrial("WebcamCheck",
    newText("PermissionWebcam", "Three brief questions before we begin:<br><br>We need to use your webcam to record where you are looking on the screen. We will <b>not</b> record any video or collect any other type of data that may reveal your identity. Do you give us permission to use your webcam?")
    ,
    newText("NoPermission", "No, I do not give my permission<br>Press the 'J' key")
    ,
    newText("YesPermission", "Yes, I give my permission,<br>Press the 'F' key")
    ,
    newCanvas("ChecksCanvas", "60vw" , "20vh")
        .add("center at 50%", "top at 10%", getText("PermissionWebcam"))
        .add("center at 20%", "top at 80%", getText("YesPermission"))
        .add("center at 80%", "top at 80%", getText("NoPermission"))
        .print("center at 50%", "top at 25%")
    ,
    newKey("yesno", "FJ")
        .wait()
    ,
    getKey("yesno")
        .test.pressed("F")
        .failure(
            getCanvas("ChecksCanvas")
                .remove()
            ,
            newCanvas("NoPermision", "60vw" , "20vh")
                .add("center at 50%", "top at 10%", newText("Unfortunately you cannot participate in this study. Please close the experiment by closing the browser (you can ignore possible pop-up screens)"))
                .print("center at 50%", "top at 25%")
            ,
            newButton("waitforever")
                .wait()
        )
)

newTrial("ChromeCheck",
    newText("ChromeCheckText", "Three brief questions before we begin:<br><br>This study only works well if you are using the Google Chrome browser on a laptop or desktop computer (so not on a mobile phone or tablet). Are you currently using <b> Google Chrome Desktop </b>?")
    ,
    newText("NoChrome", "No, I am using another browser/device<br>Press the 'J' key")
    ,
    newText("YesChrome", "Yes, I am currently using Chrome Desktop<br>Press the 'F' key")
    ,
    newCanvas("ChecksCanvas", "60vw" , "20vh")
        .add("center at 50%", "top at 10%", getText("ChromeCheckText"))
        .add("center at 20%", "top at 80%", getText("YesChrome"))
        .add("center at 80%", "top at 80%", getText("NoChrome"))
        .print("center at 50%", "top at 25%")
    ,
    newKey("yesno", "FJ")
        .wait()
    ,
    getKey("yesno")
        .test.pressed("F")
            .failure(
            getCanvas("ChecksCanvas")
                .remove()
            ,
            newCanvas("NoChrome", "60vw" , "20vh")
                .add("center at 50%", "top at 10%", newText("Unfortunately, this experiment only works on Google Chrome (which can be downloaded for free). Please close the experiment by closing the browser (you may ignore possible pop-up screens), and come back on Chrome."))
                .print("center at 50%", "top at 25%")
            ,
            newButton("waitforever")
                .wait()
        )
)

newTrial("L1Check",
    newText("L1CheckText", "Three brief questions before we begin:<br><br>To participate in this study, it is required that you are a <b>native speaker of English</b>. Are you a native speaker of English?")
    ,
    newText("NoL1", "No, I am not a native speaker of English<br>Press the 'J' key")
    ,
    newText("YesL1", "Yes, English is my first language<br>Press the 'F' key")
    ,
    newCanvas("ChecksCanvas", "60vw" , "20vh")
        .add("center at 50%", "top at 10%", getText("L1CheckText"))
        .add("center at 20%", "top at 80%", getText("YesL1"))
        .add("center at 80%", "top at 80%", getText("NoL1"))
        .print("center at 50%", "top at 25%")
    ,
    newKey("yesno", "FJ")
        .wait()
    ,
    getKey("yesno")
        .test.pressed("F")
            .failure(
            getCanvas("ChecksCanvas")
                .remove()
            ,
            newCanvas("NoL1", "60vw" , "20vh")
                .add("center at 50%", "top at 10%", newText("Unfortunately, you are not eligible to participate in this study. Please close the experiment by closing the browser (you may ignore possible pop-up screens)."))
                .print("center at 50%", "top at 25%")
            ,
            newButton("waitforever")
                .wait()
        )
)

// Welcome text
newTrial("Welcome",
    newVar("Subject", randomnumber = Math.floor(Math.random()*1000000))
        .global()
        .log()
    ,
    newText("WelcomeText", "Welcome and thank you for participating in this experiment.<br><br>The task is very simple and should take roughly 20 minutes to complete (there will be a break in the middle). You will listen to short sentences while four images are presented on your computer screen. After each sentence, you need to click on the image that the sentence is referring to. Feel free to look anywhere, as long as it is on your computer screen. Your webcam will be used to follow your eye movements on the task. <br><br>We will <b>not</b> collect any video data or any other type of data that may reveal your identity. We only collect data on where on the screen your eyes are looking during the experiment.<br><br>It is important that you are in a well-lit and quiet environment, otherwise the webcam may not be able to pick up your eye movements. Please turn off any devices or applications that may distract you during this task (such as your mobile phone or your email application) and please close other websites that you may have open.<br><br>The next pages will appear in fullscreen. <b>Please do not close the fullscreen for the remainder of this experiment.</b> <br><br>Press <b>SPACE</b> to continue.")
    ,
    newCanvas("InstructionsCanvas", "60vw" , "20vh")
        .add(0,0, getText("WelcomeText"))
        .print("center at 50%", "top at 25%")
    ,
    newKey("next", " ")
        .wait()
    ,
    fullscreen()
)
.setOption("hideProgressBar", true)

//Consent text:
newTrial("Consent",
    newHtml("consent_form", "consent.html")
        .center()
        .cssContainer({"width":"720px"})
        .checkboxWarning("You must consent before continuing.")
        .print()
    ,
    newButton("continue", "Click to continue")
        .center()
        .print()
        .wait(getHtml("consent_form").test.complete()
                  .failure(getHtml("consent_form").warn())
        )
)
.setOption("hideProgressBar", true)

//Ask for the Prolific ID
newTrial("ProlificID_trial",
    newText("Please fill in your Prolific ID below, so we can process your payment")
        .center()
        .print()
    ,
    newTextInput("ProlificID")
        .center()
        .print()
    ,
    newButton("Continue")
        .center()
        .print()
        .wait()
    ,
    newVar("ProlificID")
        .settings.global()
        .set( getTextInput("ProlificID") )
    )
    .log( "ProlificID" , getVar("ProlificID") )


// Set up the webcam: we do a first calibration here---meanwhile, the resources are preloading
newTrial("WebcamSetUp",
    newText("WebcamSetUpText", "The next pages will help you set up the audio and webcam. The webcam will be set up in a simple calibration procedure. During this calibration, you will see a video of your webcam stream. Again, we will not save any recordings of this video stream. Please make sure your face is fully visible, and that you sit centrally in front of your webcam.<br><br>You can start the calibration procedure by clicking on the start button that will appear on the middle of the screen.<br><br>In the calibration procedure, you will see eight buttons on your screen. Please click on all these buttons and follow your cursor closely with your eyes. Once you've clicked on all buttons, a new button will appear in the middle of the screen. Please click on this button and <b>look at it for three seconds</b> so the algorithm can check whether it's well calibrated.<br><br>In case calibration fails, the last step will be repeated. <br><br> Press <b>SPACE</b> to continue.")
        .center()
        .print()
    ,
    newKey("next", " ")
        .wait( newEyeTracker("tracker").test.ready())
    ,
    fullscreen()
    ,
    // Start calibrating the eye-tracker, allow for up to 3 attempts
    // 50 means that calibration succeeds when 50% of the estimates match the click coordinates
    // Increase the threshold for better accuracy, but more risks of losing participants
    getEyeTracker("tracker").calibrate(5,3)
  )
  .noHeader()
  .setOption("hideProgressBar", true)

// Audio set-up
newTrial("AudioSetUp",
    newText("AudioInstructions", "Now that you have set up and calibrated the webcam, let’s set up the audio. In this experiment, you will hear a number of sentences. You can play one of the sentences that will be used in the experiment by clicking the play button below. Please use this audio recording to adjust your volume. Feel free to replay this sentence as often as you need. Once you’re ready, you can go to the next page.")
    ,
    newAudio("Volume_sentence", "prac_arrow_0percent_blue.wav")
    ,
    newCanvas( "myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("AudioInstructions"))
        .settings.add("center at 50%", "top at 20%", getAudio("Volume_sentence"))
        .print("center at 50%", "top at 25%")
    ,
    newButton("Take me to the next page")
        .center()
        .print("center at 50%", "top at 70%")
        .wait()
)
    .setOption("hideProgressBar", true)

// Audio check
newTrial("AudioCheck",
    newText("AudioCheckUp", "Now that the audio volume is set, please listen to the audio file presented below. After you listened to the sentence, please type in the sentence you heard in the field that appears.<br><br>Please listen carefully, because <b>you can only listen to the sentence once.</b><br><br> Feel free to move your head if you want to look at your keyboard while typing. ")
    ,
    newCanvas( "myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("AudioCheckUp"))
        .print("center at 50%", "top at 25%")
    ,
    newAudio("Check_sentence", "prac_marble_never_green.wav")
        .center()
        .print("center at 50%", "top at 40%")
        .wait()
        .remove()
    ,
    newTextInput("AudioCheckInput", "Type in the sentence you heard")
            .center()
            .log()
            .lines(0)
            .size(400, 50)
            .print("center at 50%", "top at 40%")
    ,
    newButton("Take me to the next page")
        .print("center at 50%", "top at 45%")
        .wait()
)
    .setOption("hideProgressBar", true)
//
//
//

// Experiment instructions:
newTrial("Instructions",
    newText("TaskInstructions", "<p>You're all set to start the experiment! You will hear a couple of short sentences while you look at the screen. Feel free to look anywhere, as long as it's on the screen.<br><br>Before each trial, you will see a button in the middle of your screen. Click on this button and look at it for three seconds. The webcam will check whether it is still calibrated. If it is, the trial will automatically start after three seconds. Otherwise, the calibration procedure will be repeated. <br><br>For each trial, your task is to click on the image that the sentence is referring to. <br><br>We’ll first start with four practice trials, so you will know how the experiment works. Then, we will continue to the experiment. This experiment should take roughly 20 minutes to complete, and there will be a break in the middle.<br><br>Please make sure you keep your head as still as possible throughout the experiment. (of course, with the exception of the break)")
    ,
    newCanvas("myCanvas", 800 , 300)
        .settings.add(0,0, getText("TaskInstructions"))
        .print("center at 50%", "top at 25%")
    ,
    newButton("Take me to the practice trials")
        .center()
        .print("center at 50%", "top at 70%")
        .wait()
)
    .setOption("hideProgressBar", true)


// Trials: Practise
Template( "practise.csv" , row =>
    newTrial("PractiseSession",
        // The callback commands lets us log the X and Y coordinates of the estimated gaze-locations at each recorded moment in time
    newEyeTracker("tracker",1).callback( function (x,y) {
        if (this != getEyeTracker("tracker")._element.elements[0]) return;
        getEyeTracker("tracker")._element.counts._Xs.push(x);
        getEyeTracker("tracker")._element.counts._Ys.push(y);
        })
    ,
    newFunction(()=>{
        getEyeTracker("tracker")._element.counts._Xs = [];
        getEyeTracker("tracker")._element.counts._Ys = [];
    }).call()
,
        // Check/recalibrate the tracker before every trial
        getEyeTracker("tracker")
            .calibrate(5)  // Make sure that the tracker is still calibrated
            .log()  // log the calibration scores
        ,
        // We will print four character-card pairs of images, one on each quadrant of the page
        // The images are 20%-width x 20%-height of the page, but each pair is contained
        // in a 40% Canvas so as to capture slightly-off gazes
        defaultImage.size("20vh", "20vh")
        ,
        newCanvas("TopLeft", "50vw", "50vh")
            .add( "center at 50%" , "middle at 50%" , newImage(row.TopLeft_loc1) )
            .print( "center at 25%" , "middle at 25%" )
        ,
        newCanvas("BottomLeft", "50vw", "50vh")
            .add( "center at 50%" , "middle at 50%" , newImage(row.BottomLeft_loc2) )
            .print( "center at 25%" , "middle at 75%" )
        ,
        newCanvas("TopRight", "50vw", "50vh")
            .add( "center at 50%" , "middle at 50%" , newImage(row.TopRight_loc3) )
            .print( "center at 75%" , "middle at 25%" )
        ,
        newCanvas("BottomRight", "50vw", "50vh")
            .add( "center at 50%" , "middle at 50%" , newImage(row.BottomRight_loc4) )
            .print( "center at 75%" , "middle at 75%" )
        ,
        getEyeTracker("tracker")
            .add(   // We track the Canvas elements
                getCanvas("TopLeft"),
                getCanvas("BottomLeft"),
                getCanvas("TopRight"),
                getCanvas("BottomRight")
            )
            .log()  // If this line is missing, the eye-tracking data won't be sent to the server
            .start()
        ,
        newTimer(2000)
            .start()
            .wait()
        ,
        newAudio("sentence", row.Sound)
            .log()
            .play()
        ,
        // Wait for a click on one of the four Canvas elements
        newSelector("answer")
            .add(
              getCanvas("TopLeft"),
              getCanvas("BottomLeft"),
              getCanvas("TopRight"),
              getCanvas("BottomRight")
            )
            .once()
            .log()
            .wait()
        ,
        // Stop now to prevent collecting unnecessary data
        getEyeTracker("tracker")
            .stop()
        ,
        // Make sure playback is over before moving on
        getAudio("sentence").wait("first")
        ,
        newTimer(200).start().wait()
        ,
        fullscreen()
    )
  .setOption("hideProgressBar", true)
  .noHeader()
  .log("Subject"              , getVar("Subject")         )
  .log( "ProlificID"          , getVar("ProlificID")      )
  .log( "targetloc"           , row.targetloc                )
  .log( "comploc"             , row.comploc                )
  .log( "dist1loc"            , row.dist1loc                )
  .log( "dist2loc"            , row.dist2loc                )
  .log( "displayID"           , row.displayID)
  .log( "sentence"            , row.Sound                 )
  .log( "modal"               , row.modal          )
  .log( "ExpFiller"           , row.condition    )
  .log( "list"                , row.list                  )
  .log( "ViewportWidth" 		, window.innerWidth	 		) // Screensize: width
  .log( "ViewportHeight"		, window.innerHeight 		) // Screensize: heigth
)

// Page that tells the participants that the experiment will begin.
newTrial("EndOfPractise",
    newText("EndOfPractiseText", "Those were the four practice trials. Please click on the button below to start the experiment.")
    ,
    newCanvas("myCanvas", 800 , 300)
        .settings.add("center at 50%",0, getText("EndOfPractiseText"))
        .print("center at 50%", "top at 25%")
    ,
    newButton("Start the experiment")
        .center()
        .print("center at 50%", "top at 40%")
        .wait()
)
    .setOption("hideProgressBar", true)

SetCounter("Counter", "inc", 1);

// Trials
Template( "items.csv" , row =>
    newTrial("Main",
        // The callback commands lets us log the X and Y coordinates of the estimated gaze-locations at each recorded moment in time
    newEyeTracker("tracker",1).callback( function (x,y) {
        if (this != getEyeTracker("tracker")._element.elements[0]) return;
        getEyeTracker("tracker")._element.counts._Xs.push(x);
        getEyeTracker("tracker")._element.counts._Ys.push(y);
        })
    ,
    newFunction(()=>{
        getEyeTracker("tracker")._element.counts._Xs = [];
        getEyeTracker("tracker")._element.counts._Ys = [];
    }).call()
,
        // Check/recalibrate the tracker before every trial
        getEyeTracker("tracker")
            .calibrate(5)  // Make sure that the tracker is still calibrated
            .log()  // log the calibration scores
        ,
        // We will print four character-card pairs of images, one on each quadrant of the page
        // The images are 20%-width x 20%-height of the page, but each pair is contained
        // in a 40% Canvas so as to capture slightly-off gazes
        defaultImage.size("20vh", "20vh")
        ,
        newCanvas("TopLeft", "50vw", "50vh")
            .add( "center at 50%" , "middle at 50%" , newImage(row.TopLeft_loc1) )
            .print( "center at 25%" , "middle at 25%" )
        ,
        newCanvas("BottomLeft", "50vw", "50vh")
            .add( "center at 50%" , "middle at 50%" , newImage(row.BottomLeft_loc2) )
            .print( "center at 25%" , "middle at 75%" )
        ,
        newCanvas("TopRight", "50vw", "50vh")
            .add( "center at 50%" , "middle at 50%" , newImage(row.TopRight_loc3) )
            .print( "center at 75%" , "middle at 25%" )
        ,
        newCanvas("BottomRight", "50vw", "50vh")
            .add( "center at 50%" , "middle at 50%" , newImage(row.BottomRight_loc4) )
            .print( "center at 75%" , "middle at 75%" )
        ,
        getEyeTracker("tracker")
            .add(   // We track the Canvas elements
                getCanvas("TopLeft"),
                getCanvas("BottomLeft"),
                getCanvas("TopRight"),
                getCanvas("BottomRight")
            )
            .log()  // If this line is missing, the eye-tracking data won't be sent to the server
            .start()
        ,
        newTimer(2000)
            .start()
            .wait()
        ,
        newAudio("sentence", row.Sound)
            .log()
            .play()
        ,
        // Wait for a click on one of the four Canvas elements
        newSelector("answer")
            .add(
              getCanvas("TopLeft"),
              getCanvas("BottomLeft"),
              getCanvas("TopRight"),
              getCanvas("BottomRight")
            )
            .once()
            .log()
            .wait()
        ,
        // Stop now to prevent collecting unnecessary data
        getEyeTracker("tracker")
            .stop()
        ,
        // Make sure playback is over before moving on
        getAudio("sentence").wait("first")
        ,
        newTimer(200).start().wait()
        ,
        fullscreen()
    )
  .setOption("hideProgressBar", true)
  .noHeader()
    .log( "Subject", getVar( "Subject" ) )
  	.log( "ProlificID", getVar( "ProlificID" ) )
  	.log( "targetloc", row.targetloc )
  	.log( "comploc", row.comploc )
  	.log( "dist1loc", row.dist1loc )
  	.log( "dist2loc", row.dist2loc )
  	.log( "displayID", row.displayID )
  	.log( "sentence", row.Sound )
  	.log( "modal", row.modal )
  	.log( "ExpFiller", row.condition )
  	.log( "list", row.group )
  	.log( "ViewportWidth", window.innerWidth ) // Screensize: width
  	.log( "ViewportHeight", window.innerHeight )// Screensize: heigth
)

// Break between the blocks
newTrial("BlinkBreak",
    newText("BlinkBreakText", "This was the first block! Feel free to take a break. Please make sure that this break is not much longer than five minutes, so you won't time out on Prolific.<br><br>Click on the button below to continue to the final block of the experiment.<br><br> Make sure you are centrally seated before your webcam and to keep your head still throughout the remainder of this experiment.")
    ,
    newCanvas( "myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("BlinkBreakText"))
        .print("center at 50%", "middle at 50%")
    ,
    newButton("Take me to the next block (which will appear in fullscreen again)")
        .print("center at 50%", "top at 45%")
        .wait()
    ,
    fullscreen()
)
.setOption("hideProgressBar", true)


// Finally, some questionnaires
newTrial("QuestionnairePage",
    newHtml("Questionnaire", "questionnaire.html")
        .settings.log()
      	.cssContainer( {"width": "720px"} )
      	.print()
    ,
    newButton("continue", "Continue")
        .center()
        .print()
        .wait(getHtml("Questionnaire").test.complete()
                  .failure(getHtml("Questionnaire").warn())
        )
)

SendResults()

// Final page
newTrial("FinalPage",
    exitFullscreen()
    ,
    newText("Information", "You can download a copy of the information sheet by clicking on this link:
    <a href='https://pcibex.research-zas.de/ibexfiles/scalar/online_adult_behavior.pdf' target='_blank'>Information sheet</a>)
    ,
    
    newText("Final","This is the end of the experiment. <strong> Please verify your participation on Prolific by clicking on this link:  </strong> <br> Thank you for your participation!")
    // <p><a href='https://app.prolific.co/submissions/complete?cc=4E2A5428'>https://app.prolific.co/submissions/complete?cc=4E2A5428</a></p>
    ,
    newCanvas("myCanvas", "60vw" , "60vh")
        .settings.add(0,0, getText("Final"))
        .print("center at 50%", "middle at 50%")
    ,
    newButton("waitforever").wait() // Not printed: wait on this page forever
)
    .setOption("hideProgressBar", true)
