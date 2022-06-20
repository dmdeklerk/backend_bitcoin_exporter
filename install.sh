# Requires nodejs
# sudo curl -fsSL https://deb.nodesource.com/setup_14.x | sudo bash - &&  sudo apt-get install -y nodejs

if which node > /dev/null
then
  echo "node is installed..."
else 
  echo "Please install node first"
  echo "sudo curl -fsSL https://deb.nodesource.com/setup_14.x | sudo bash -"
  echo "sudo apt-get install -y nodejs"
  exit
fi

DIR=`pwd`
APP="backend_ethereum_exporter"
sudo npm install
echo "Installing $APP in $DIR"
sudo tee "/lib/systemd/system/$APP.service" <<EOF
[Unit]
Description=$APP prometheus exporter
Documentation=
After=network.target

[Service]
Environment=
Type=simple
User=root
ExecStart=/usr/bin/node $DIR/index.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable $APP
sudo systemctl start $APP