---
title: Arkime Install
layout: wiki
permalink: "/install"
copyLink: True
---


- TOC
{:toc}
{: .left-nav .d-none .d-sm-block .pt-3 .with-footer .wiki-toc }

<div class="full-height-container with-footer px-3 mb-4 mt-1" markdown="1">


# Installation Guide for Arkime
{: .section-header .mt-1 }

**Note:** Most of the commands in this guide require root privileges. Please ensure you are running as root or using `sudo`.

This guide details the steps involved in installing Arkime 5.2 or later on a Linux machine.
A basic Arkime cluster consists of a database (OpenSearch or Elasticsearch) and Arkime sensors.
Arkime sensors run the capture and viewer tools and process the network traffic.
The capture tool is responsible for processing and storing the packets along with extracting the metadata to be stored in OpenSearch or Elasticsearch.
The viewer tool provides the end-user interface, packet retrieval, and some housekeeping functions.
It is possible to run both the database and sensors on the same machine, however it is not recommended for production environments.

If you are interested in how many and types of machines you need for your environment, please see our [hardware estimators](https://arkime.com/estimators).

If you want to use an Arkime container instead of installing on a Linux machine, please see our [docker guide](https://arkime.com/docker).

If you just want to get a single-machine evaluation install up and running as quickly as possible, jump to the [Single Machine Quick Start](#single-machine-quick-start) at the bottom of this page. For a production deployment, read through the full guide instead.
{: .alert.alert-info }

## Linux Distribution
{: .section-header }

We recommend using a stable version of Debian or Long-Term Support (LTS) version of Ubuntu.
Both of these distributions are well supported, receive regular updates, and are easy to upgrade.
Users of other distributions may need to modify the installation commands to avoid library compatibility issues.

## Installing OpenSearch or Elasticsearch
{: .section-header }

Arkime requires a database to store the metadata associated with the network sessions that are processed.
It is strongly recommended to NOT use the same machines for both the database and the sensors in a production environment.
If you must use the same machines, please use different disk partitions for the database and the saved packets, otherwise, there will be contention for disk space and Arkime will eventually stop working.

The official matrix of supported versions of OpenSearch and Elasticsearch is available at the top of the [CHANGELOG](https://raw.githubusercontent.com/arkime/arkime/master/CHANGELOG). We answer many OpenSearch/Elasticsearch questions in the OpenSearch/Elasticsearch section of the [FAQ](https://arkime.com/faq#elasticsearch).

### Download and Install OpenSearch or Elasticsearch
{: .subsection }

**Note:** Avoid OpenSearch 2.19.0 — it has a [known bug](https://github.com/opensearch-project/OpenSearch/issues/17339) that causes HTTP responses to hang when the client supports zstd compression (curl 8.5.0+, the default on Debian 13 and Ubuntu 24.04). Use OpenSearch 2.18.0 or 3.x instead, or set `http.compression: false` in `opensearch.yml` as a workaround. See the [FAQ](https://arkime.com/faq#http-compression) for details.

There are many ways to download and install [OpenSearch](https://opensearch.org/downloads.html) or [Elasticsearch](https://www.elastic.co/downloads/elasticsearch), we recommend using the official packages for your Linux distribution when possible.
For a test environment, running OpenSearch or Elasticsearch on the same machine as the Arkime sensor will work, otherwise, please use separate machines.
In a production environment, we recommend having at least three machines for OpenSearch/Elasticsearch to provide redundancy, and they work best with three leader/master nodes.
You only need one of OpenSearch or Elasticsearch — not both. We support either equally well; pick whichever fits your environment and follow only that section below.

Both products come with built-in security that requires a username and password to connect.
During installation, you may be prompted to set a password, or one may be automatically generated.
Please make note of this user/password as you'll need it later when configuring Arkime.
Both the `db.pl` init command and the `config.ini` need the same OpenSearch/Elasticsearch user/password.

### Install and Configure OpenSearch
{: .subsection }

Once you download OpenSearch, you can install it by running the following command:
* Debian/Ubuntu: `apt install ./opensearch-*.deb`
* EL: `yum install ./opensearch-*.rpm`

You may need to update the JVM heap size in the `/etc/opensearch/jvm.options` file.

`nano /etc/opensearch/jvm.options`

Look for the following lines:
```
-Xms1g
-Xmx1g
```

Change them based on how much memory you have available, the minimum recommended heap size is 4GB, and the maximum heap size is 31GB. This example uses 12GB. It is suggested you don't use more than 50% of your system memory for the JVM heap size and that both values are the same.
```
-Xms12g
-Xmx12g
```

You'll need to enable OpenSearch to start now and on boot with the following command:
`systemctl enable --now opensearch`

### Install and Configure Elasticsearch
{: .subsection }

Once you download Elasticsearch, you can install it by running the following command:
* Debian/Ubuntu: `apt install ./elasticsearch-*.deb`
* EL: `yum install ./elasticsearch-*.rpm`

You may need to update the JVM heap size in the `/etc/elasticsearch/jvm.options` file.

`nano /etc/elasticsearch/jvm.options`

Look for the following lines:
```
-Xms1g
-Xmx1g
```

Change them based on how much memory you have available, the minimum recommended heap size is 4GB, and the maximum heap size is 31GB. This example uses 12GB. It is suggested you don't use more than 50% of your system memory for the JVM heap size and that both values are the same.
```
-Xms12g
-Xmx12g
```

You'll need to enable Elasticsearch to start now and on boot with the following command:
`systemctl enable --now elasticsearch`

### Single Machine OpenSearch Example on Ubuntu or Debian
{: .subsection }

**Note:** The version below is just an example — check the [OpenSearch downloads page](https://opensearch.org/downloads.html) for the latest supported version and adjust the URL accordingly.
```
apt update
apt install -y wget curl
wget https://artifacts.opensearch.org/releases/bundle/opensearch/2.18.0/opensearch-2.18.0-linux-x64.deb

# You should change this password, if it isn't strong enough install will fail. :(
# Minimum 10 character password and must contain at least one uppercase letter, one lowercase letter, one digit, and one special character
export OPENSEARCH_INITIAL_ADMIN_PASSWORD="PleaseChangeM3!"

apt install -y ./opensearch-2.18.0-linux-x64.deb
systemctl enable --now opensearch

# Verify that OpenSearch is running
sleep 5
curl -k --user "admin:$OPENSEARCH_INITIAL_ADMIN_PASSWORD" https://localhost:9200/_cat/health

```

### Moving to multiple machines
{: .subsection }

When you are ready to have multiple OpenSearch/Elasticsearch machines or have the Arkime Sensor on a different machine, you'll need to update the `/etc/opensearch/opensearch.yml` or `/etc/elasticsearch/elasticsearch.yml` file to have the following settings:

```
network.host: 0.0.0.0
```

This causes OpenSearch/Elasticsearch to listen on all interfaces, not just localhost.
We also have a list of some common settings you may need to change in the [FAQ](https://arkime.com/faq#recommended-elasticsearch-settings), many of these can also be changed in the Arkime UI.


## Installing Arkime Sensors
{: .section-header }

Once you have a working OpenSearch/Elasticsearch cluster you can install the Arkime sensor.

### Download Arkime
{: .subsection }

If new to Arkime we recommend starting with the latest [stable version](https://github.com/arkime/arkime/releases/latest), however if you like to use the latest and greatest we have a [latest commit version](https://github.com/arkime/arkime/releases/last-commit6) that is rebuilt after every commit to github.

The download page for each release contains multiple Arkime packages.
When choosing an Arkime package, please select a version that corresponds to the Linux distribution, version, and the architecture of your system.

NOTE: A clear indication of an incorrect download is libssl or libyaml errors when trying to run capture.

### Installing Arkime Package
{: .subsection }

After downloading the Arkime package, you can install it by running the following commands:
* Debian/Ubuntu: `apt install ./arkime-*.deb`
* EL: `yum install ./arkime-*.rpm`

### Initialize the OpenSearch/Elasticsearch database
{: .subsection }

Once the Arkime package is installed, you need to initialize the OpenSearch/Elasticsearch database.
Most database operations are completed using the `db.pl` script located in the `/opt/arkime/db` directory.
You'll need to provide the URL of the OpenSearch/Elasticsearch database and the password you set during the OpenSearch/Elasticsearch installation.
If using the builtin OpenSearch/Elasticsearch certificates, you'll need to add the `--insecure` option when not running on the same server as the database.
You will also need to decide how you want to delete old sessions, either by ILM/ISM or by using the `db.pl` script in a cron job.
We suggest using ILM/ISM.


These examples assume you are doing daily rollovers and keeping 30 days of data.
#### Elasticsearch ILM Example
```
/opt/arkime/db/db.pl --esuser admin https://localhost:9200 init --ilm
/opt/arkime/db/db.pl --esuser admin https://localhost:9200 ilm 1d 30d
```
#### OpenSearch ISM Example
```
/opt/arkime/db/db.pl --esuser admin https://localhost:9200 init --ism
/opt/arkime/db/db.pl --esuser admin https://localhost:9200 ism 1d 30d
```
#### Cron Job Example
If you don't want to use ISM/ILM to manage your OpenSearch/Elasticsearch storage, you can use a cron job that cleans up the indices instead. Note that the password is included in the URL because cron jobs can't prompt interactively. The job should be run once per day, ideally during off-peak hours.

First initialize the database (run once):
```
/opt/arkime/db/db.pl --esuser admin https://localhost:9200 init
```

Then add the following line to a user's crontab (`crontab -e`) to expire old data daily at 3:00 AM:
```
0 3 * * * /opt/arkime/db/db.pl --esuser admin:password https://localhost:9200 expire daily 30
```


### Configure Arkime
{: .subsection }

We provide a simple Configuration script that will take a sample config.ini and create a new one with the correct settings.
To use the Configuration script, run the following command: `/opt/arkime/bin/Configure`
You can always edit the /opt/arkime/etc/config.ini file directly after running Configure.
Make sure you provide the same OpenSearch/Elasticsearch user/password that you used when initializing the database above.

### Adding admin user
{: .subsection }

Before you can use the Arkime UI, you must add the first user.
```
/opt/arkime/bin/arkime_add_user.sh admin "Admin User" changeme --admin
```
You can change the password or other settings later in the Arkime UI under the Users tab.
NOTE: This isn't the same as the admin user for OpenSearch/Elasticsearch, this is the admin user for the Arkime UI.
Please use a different password than the OpenSearch/Elasticsearch password.

### Start the Arkime Sensor
{: .subsection }

To start the Arkime sensor, run `systemctl enable --now arkimecapture` and `systemctl enable --now arkimeviewer`, which will start the capture and viewer services now and on boot.
If there are issues, log files are located in the `/opt/arkime/logs` directory.

### Accessing the Arkime UI
{: .subsection }

Once the Arkime sensor is running, you can access the Arkime UI by navigating to `http://<hostname>:8005` in your web browser.
Use the authentication information from above, username `admin` and the password is `changeme` in the example.

### Single Machine Arkime Example on Ubuntu 24 LTS
{: .subsection }

**Note:** The version below is just an example — check the [Arkime releases page](https://github.com/arkime/arkime/releases/latest) for the latest stable version and adjust the URL and filename accordingly.
```
apt update
apt install -y wget iproute2 ethtool
wget https://github.com/arkime/arkime/releases/download/v6.3.1/arkime_6.3.1-1.ubuntu2404_amd64.deb
apt install -y ./arkime_6.3.1-1.ubuntu2404_amd64.deb
# OR latest commit version
#wget https://github.com/arkime/arkime/releases/download/last-commit6/arkime-main_ubuntu2404_amd64.deb
#apt install -y ./arkime-main_ubuntu2404_amd64.deb

# Configure Arkime
/opt/arkime/bin/Configure
#### Interface: the interface to monitor
#### Install Elasticsearch: no
#### OpenSearch/Elasticsearch URL: https://localhost:9200
#### OpenSearch/Elasticsearch User: admin
#### OpenSearch/Elasticsearch Password: PleaseChangeM3!
#### Password: A new password, not the ES password
#### Download GeoIP: yes

# Initialize the database using cron expire, use the password from OpenSearch/Elasticsearch!!!
/opt/arkime/db/db.pl --esuser admin https://localhost:9200 init

# Create the admin user - IMPORTANT: Change 'changeme' to a secure password!
/opt/arkime/bin/arkime_add_user.sh admin "Admin User" changeme --admin

# Start the Arkime Sensor
systemctl enable --now arkimecapture
systemctl enable --now arkimeviewer

# Verify that Arkime is running
sleep 1
tail /opt/arkime/logs/*.log
curl -u admin:changeme --digest http://localhost:8005/eshealth.json
```
## Installing Cont3xt
{: .section-header }

Cont3xt centralizes and simplifies a structured approach to gathering contextual intelligence in support of technical investigations.
Cont3xt requires a database and can use the same OpenSearch/Elasticsearch database instance as Arkime, or it can use a separate instance.

See the OpenSearch/Elasticsearch section [above](#download-and-install-opensearch-or-elasticsearch) for instructions on installing OpenSearch or Elasticsearch.

See the Arkime section [above](#download-arkime) for instructions on installing the Arkime package.

We answer many Cont3xt questions in the Cont3xt section of the [FAQ](https://arkime.com/faq#cont3xt).

### Configuring Cont3xt
{: .subsection }

We provide a simple Configuration script that will take a sample cont3xt.ini and create a new one with the correct settings.
To use the Configuration script, run the following command: `/opt/arkime/bin/Configure --cont3xt`
You can always edit the /opt/arkime/etc/cont3xt.ini file directly after running Configure.

### Single Machine Cont3xt Example on Ubuntu 24 LTS
{: .subsection }

**Note:** The version below is just an example — check the [Arkime releases page](https://github.com/arkime/arkime/releases/latest) for the latest stable version and adjust the URL and filename accordingly.
```
apt update
apt install -y wget
wget https://github.com/arkime/arkime/releases/download/v6.3.1/arkime_6.3.1-1.ubuntu2404_amd64.deb
apt install -y ./arkime_6.3.1-1.ubuntu2404_amd64.deb
# OR latest commit version
#wget https://github.com/arkime/arkime/releases/download/last-commit6/arkime-main_ubuntu2404_amd64.deb
#apt install -y ./arkime-main_ubuntu2404_amd64.deb

# Configure Cont3xt
/opt/arkime/bin/Configure --cont3xt
#### OpenSearch/Elasticsearch URL: https://localhost:9200
#### OpenSearch/Elasticsearch User: admin
#### OpenSearch/Elasticsearch Password: PleaseChangeM3!
#### Password: A new password, not the ES password

# Initialize the database if not done previously, use the password from OpenSearch/Elasticsearch!!!
/opt/arkime/db/db.pl --esuser admin https://localhost:9200 init

# Create the admin user if not done previously
/opt/arkime/bin/arkime_add_user.sh admin "Admin User" changeme --admin

# Start Cont3xt
systemctl enable --now arkimecont3xt

sleep 1
tail /opt/arkime/logs/cont3xt.log
```

## Single Machine Quick Start
{: .section-header }

This is a copy-paste-friendly walkthrough that installs OpenSearch and Arkime on a single Ubuntu 24 LTS machine for **evaluation or testing**. It is not a production setup — for production, read the full guide above (separate database and sensor machines, ILM/ISM, hardened passwords, TLS certs, etc.).

**Note:** The versions below are examples — check the [OpenSearch downloads page](https://opensearch.org/downloads.html) and the [Arkime releases page](https://github.com/arkime/arkime/releases/latest) for the latest versions and adjust the URLs accordingly. Run everything as root (or with `sudo`).

```
# --- Install OpenSearch ---
apt update
apt install -y wget curl iproute2 ethtool

wget https://artifacts.opensearch.org/releases/bundle/opensearch/2.18.0/opensearch-2.18.0-linux-x64.deb

# Must be 10+ chars with upper, lower, digit, and special character. CHANGE THIS.
export OPENSEARCH_INITIAL_ADMIN_PASSWORD="PleaseChangeM3!"

apt install -y ./opensearch-2.18.0-linux-x64.deb
systemctl enable --now opensearch

# Verify OpenSearch is up
sleep 5
curl -k --user "admin:$OPENSEARCH_INITIAL_ADMIN_PASSWORD" https://localhost:9200/_cat/health

# --- Install Arkime ---
wget https://github.com/arkime/arkime/releases/download/v6.3.1/arkime_6.3.1-1.ubuntu2404_amd64.deb
apt install -y ./arkime_6.3.1-1.ubuntu2404_amd64.deb

# Configure Arkime (interactive). Answer:
#   Interface:                         the interface to monitor
#   Install Elasticsearch:             no
#   OpenSearch/Elasticsearch URL:      https://localhost:9200
#   OpenSearch/Elasticsearch User:     admin
#   OpenSearch/Elasticsearch Password: same as $OPENSEARCH_INITIAL_ADMIN_PASSWORD above
#   Password (Arkime store):           a NEW password, not the OpenSearch one
#   Download GeoIP:                    yes
/opt/arkime/bin/Configure

# Initialize the OpenSesarch Arkime database with ISM and 30 day retention.
/opt/arkime/db/db.pl --esuser admin https://localhost:9200 init --ism
/opt/arkime/db/db.pl --esuser admin https://localhost:9200 ism 1d 30d

# Create the Arkime UI admin user - CHANGE 'changeme' to a secure password
/opt/arkime/bin/arkime_add_user.sh admin "Admin User" changeme --admin

# Start capture and viewer
systemctl enable --now arkimecapture
systemctl enable --now arkimeviewer

# Verify
sleep 2
tail /opt/arkime/logs/*.log
curl -u admin:changeme --digest http://localhost:8005/eshealth.json
```

Then open `http://<hostname>:8005` in a browser and log in as `admin` with the password you set above.

## Arkime isn't working
{: .section-header }

If you are having issues with Arkime, please see our [FAQ](https://arkime.com/faq#arkime-is-not-working) for common issues and solutions.
{: .mb-4 }

</div>
