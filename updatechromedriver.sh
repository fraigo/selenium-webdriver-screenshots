INSTALLED=$(which chromedriver)
curl -o LATEST.txt https://chromedriver.storage.googleapis.com/LATEST_RELEASE
LATEST=$(cat LATEST.txt)
rm LATEST.txt
echo "Downloading $LATEST"
curl -o chromedriver.zip https://chromedriver.storage.googleapis.com/$LATEST/chromedriver_mac64.zip
unzip -o chromedriver.zip
rm chromedriver.zip
if [ ! "$INSTALLED" == "" ]; then
  echo "Moving to $INSTALLED"
  mv chromedriver $INSTALLED
fi
